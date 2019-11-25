/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * OpenCRVS is also distributed under the terms of the Civil Registration
 * & Healthcare Disclaimer located at http://opencrvs.org/license.
 *
 * Copyright (C) The OpenCRVS Authors. OpenCRVS and the OpenCRVS
 * graphic logo are (registered/a) trademark(s) of Plan International.
 */
import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import {
  IApplication,
  SUBMISSION_STATUS,
  DOWNLOAD_STATUS,
  makeApplicationReadyToDownload,
  downloadApplication
} from '@client/applications'
import {
  goToPage as goToPageAction,
  goBack as goBackAction,
  goToPrintCertificate as goToPrintCertificateAction
} from '@client/navigation'
import { getUserDetails, getScope } from '@client/profile/profileSelectors'
import { IStoreState } from '@client/store'
import { IUserDetails } from '@client/utils/userUtils'
import {
  StatusProgress,
  StatusOrange,
  StatusGreen,
  StatusCollected,
  StatusRejected,
  StatusFailed,
  Download,
  Warning
} from '@opencrvs/components/lib/icons'
import { SubPage, Spinner } from '@opencrvs/components/lib/interface'
import { WrappedComponentProps as IntlShapeProps, injectIntl } from 'react-intl'
import { getDraftApplicantFullName } from '@client/utils/draftUtils'
import styled, { withTheme, ITheme } from '@client/styledComponents'
import {
  createNamesMap,
  extractCommentFragmentValue
} from '@client/utils/data-formatting'
import { formatLongDate } from '@client/utils/date-formatting'
import {
  GQLHumanName,
  GQLQuery,
  GQLPerson,
  GQLRegStatus,
  GQLComment
} from '@opencrvs/gateway/src/graphql/schema.d'
import { PrimaryButton, TertiaryButton } from '@opencrvs/components/lib/buttons'
import { Event, Action } from '@opencrvs/client/src/forms'
import {
  DRAFT_BIRTH_PARENT_FORM_PAGE,
  DRAFT_DEATH_FORM_PAGE,
  REVIEW_EVENT_PARENT_FORM_PAGE
} from '@client/navigation/routes'
import { Query } from '@client/components/Query'
import { FETCH_REGISTRATION_BY_COMPOSITION } from '@client/views/Home/queries'

import {
  userMessages,
  constantsMessages as messages,
  buttonMessages,
  errorMessages
} from '@client/i18n/messages'
import {
  REJECTED,
  IN_PROGRESS,
  DECLARED,
  REJECT_REASON,
  REJECT_COMMENTS,
  REGISTERED,
  VALIDATED
} from '@client/utils/constants'
import { Scope } from '@client/utils/authUtils'
import { withApollo } from 'react-apollo'
import ApolloClient from 'apollo-client'

const HistoryWrapper = styled.div`
  padding: 10px 0px 10px 10px;
  margin-bottom: 8px;
  flex: 1;
  display: flex;
  flex-direction: row;
  color: ${({ theme }) => theme.colors.copy};
  ${({ theme }) => theme.fonts.bodyStyle};
  &:last-of-type {
    margin-bottom: 0;
  }
`
const StyledLabel = styled.label`
  margin-right: 3px;
`
const StyledValue = styled.span`
  ${({ theme }) => theme.fonts.bodyBoldStyle};
`
const Separator = styled.div`
  height: 20px;
  width: 1px;
  margin: 1px 8px;
  background: ${({ theme }) => theme.colors.copy};
`
const ValueContainer = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
`
const StatusContainer = styled.div`
  flex: 1;
  margin-left: 16px;
`
const ActionButton = styled(PrimaryButton)`
  margin: 6px 50px 30px;
`
const DownloadStatusIndicator = styled.div`
  margin: 6px 50px 30px 40px;
  display: flex;
  align-items: center;

  & > :first-child {
    margin-right: 8px;
  }
`
const QuerySpinner = styled(Spinner)`
  width: 70px;
  height: 70px;
  top: 150px !important;
`
const SpinnerContainer = styled.div`
  min-height: 70px;
  min-width: 70px;
  display: flex;
  justify-content: center;
`
const StatusIcon = styled.div`
  margin-top: 3px;
`

enum DraftStatus {
  DRAFT_STARTED = 'DRAFT_STARTED',
  DRAFT_MODIFIED = 'DRAFT_MODIFIED',
  FAILED = 'FAILED'
}

interface IDetailProps {
  theme: ITheme
  language: string
  applicationId: string
  draft: IApplication | null
  outboxApplications: IApplication[]
  userDetails: IUserDetails | null
  goToPage: typeof goToPageAction
  goBack: typeof goBackAction
  goToPrintCertificate: typeof goToPrintCertificateAction
  downloadApplication: typeof downloadApplication
  scope: Scope | null
  client: ApolloClient<{}>
}

interface IStatus {
  type: DraftStatus | GQLRegStatus | null
  practitionerName: string
  timestamp: string | null
  practitionerRole: string
  officeName: string | Array<string | null> | null
  trackingId?: string
  contactNumber?: string
  rejectReason?: string
  rejectComment?: string
}

interface IHistoryData {
  title?: string
  history: IStatus[]
  action?: React.ReactElement
}

function LabelValue({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <StyledLabel>{label}:</StyledLabel>
      <StyledValue>{value}</StyledValue>
    </div>
  )
}
function ValuesWithSeparator(props: {
  strings: string[]
  separator: React.ReactNode
}): JSX.Element {
  return (
    <ValueContainer>
      {props.strings.map((value, index) => {
        return (
          <React.Fragment key={index}>
            {value}
            {index < props.strings.length - 1 && value.length > 0
              ? props.separator
              : null}
          </React.Fragment>
        )
      })}
    </ValueContainer>
  )
}

function generateHistoryEntry(
  type: DraftStatus | GQLRegStatus | null,
  name: GQLHumanName[] | null,
  date: string,
  role: string,
  office: string,
  language: string = 'en',
  trackingId?: string,
  contactNumber?: string,
  rejectReason?: string,
  rejectComment?: string
): IStatus {
  return {
    type,
    practitionerName:
      (name && (createNamesMap(name)[language] as string)) || '',
    timestamp: date && formatLongDate(date, language, 'LL'),
    practitionerRole: role,
    officeName: office,
    trackingId,
    contactNumber,
    rejectReason,
    rejectComment
  }
}

class DetailView extends React.Component<IDetailProps & IntlShapeProps> {
  getWorkflowDateLabel = (status: string) => {
    switch (status) {
      case 'DRAFT_STARTED':
        return messages.applicationStartedOn
      case 'DRAFT_MODIFIED':
        return messages.applicationUpdatedOn
      case 'FAILED':
        return messages.applicationFailedOn
      case 'DECLARED':
        return messages.applicationSubmittedOn
      case 'REGISTERED':
        return messages.applicationRegisteredOn
      case 'REJECTED':
        return messages.applicationRejectedOn
      case 'CERTIFIED':
        return messages.applicationCollectedOn
      default:
        return messages.applicationSubmittedOn
    }
  }
  getWorkflowStatusIcon = (status: string) => {
    switch (status) {
      case 'DRAFT_STARTED':
        return <StatusProgress />
      case 'DRAFT_MODIFIED':
        return <StatusProgress />
      case 'FAILED':
        return (
          <StatusIcon>
            <StatusFailed />
          </StatusIcon>
        )
      case 'DECLARED':
        return (
          <StatusIcon>
            <StatusOrange />
          </StatusIcon>
        )
      case 'REGISTERED':
        return (
          <StatusIcon>
            <StatusGreen />
          </StatusIcon>
        )
      case 'REJECTED':
        return (
          <StatusIcon>
            <StatusRejected />
          </StatusIcon>
        )
      case 'CERTIFIED':
        return (
          <StatusIcon>
            <StatusCollected />
          </StatusIcon>
        )
      default:
        return (
          <StatusIcon>
            <StatusOrange />
          </StatusIcon>
        )
    }
  }

  userHasRegisterOrValidateScope() {
    return (
      this.props.scope &&
      (this.props.scope.includes('register') ||
        this.props.scope.includes('validate'))
    )
  }

  generateDraftHistoryData = (): IHistoryData => {
    const { draft, userDetails } = this.props
    const history: IStatus[] = []
    let action: React.ReactElement
    if (
      draft &&
      draft.submissionStatus === SUBMISSION_STATUS[SUBMISSION_STATUS.DRAFT]
    ) {
      if (draft.modifiedOn && userDetails) {
        history.push(
          generateHistoryEntry(
            DraftStatus.DRAFT_MODIFIED,
            userDetails.name as GQLHumanName[],
            new Date(draft.modifiedOn).toISOString(),
            userDetails && userDetails.role
              ? this.props.intl.formatMessage(
                  userMessages[userDetails.role as string]
                )
              : '',
            (userDetails &&
              userDetails.primaryOffice &&
              userDetails.primaryOffice.name) ||
              '',
            this.props.language
          )
        )
      }
      if (userDetails) {
        history.push(
          generateHistoryEntry(
            DraftStatus.DRAFT_STARTED,
            userDetails.name as GQLHumanName[],
            (draft.savedOn && new Date(draft.savedOn).toISOString()) || '',
            userDetails && userDetails.role
              ? this.props.intl.formatMessage(
                  userMessages[userDetails.role as string]
                )
              : '',
            (userDetails &&
              userDetails.primaryOffice &&
              userDetails.primaryOffice.name) ||
              '',
            this.props.language
          )
        )
      }
      const pageRoute =
        draft.event === Event.BIRTH
          ? DRAFT_BIRTH_PARENT_FORM_PAGE
          : DRAFT_DEATH_FORM_PAGE
      action = (
        <ActionButton
          id="draft_update"
          onClick={() =>
            this.props.goToPage(
              pageRoute,
              draft.id,
              'preview',
              (draft.event && draft.event.toString()) || ''
            )
          }
        >
          {this.props.intl.formatMessage(messages.update)}
        </ActionButton>
      )
    } else {
      history.push(generateHistoryEntry(DraftStatus.FAILED, null, '', '', ''))
      action = (
        <ActionButton id="failed_retry" disabled>
          {this.props.intl.formatMessage(buttonMessages.retry)}
        </ActionButton>
      )
    }
    let title = ''
    if (draft) {
      title = getDraftApplicantFullName(draft, this.props.language)
    }
    return {
      title: title !== '' ? title : undefined,
      history,
      action
    }
  }

  downloadApplication = (
    event: string,
    compositionId: string,
    action: string
  ) => {
    const downloadableApplication = makeApplicationReadyToDownload(
      event.toLowerCase() as Event,
      compositionId,
      action
    )
    this.props.downloadApplication(downloadableApplication, this.props.client)
  }

  getActionForStateAndScope = (
    event: string | undefined,
    id: string | undefined,
    applicationState: DraftStatus | GQLRegStatus | null,
    downloadStatus?: string
  ) => {
    if (
      applicationState === REJECTED &&
      !this.userHasRegisterOrValidateScope()
    ) {
      return (
        <ActionButton id="reject_update" disabled>
          {this.props.intl.formatMessage(messages.update)}
        </ActionButton>
      )
    } else if (
      applicationState === REGISTERED.toUpperCase() &&
      this.userHasRegisterOrValidateScope()
    ) {
      if (downloadStatus !== DOWNLOAD_STATUS.DOWNLOADED) {
        return downloadStatus === DOWNLOAD_STATUS.DOWNLOADING ||
          downloadStatus === DOWNLOAD_STATUS.READY_TO_DOWNLOAD ? (
          <DownloadStatusIndicator>
            <span>{this.props.intl.formatMessage(messages.downloading)}</span>
            <Spinner id="action-loading" size={24} />
          </DownloadStatusIndicator>
        ) : (
          <DownloadStatusIndicator>
            {downloadStatus === DOWNLOAD_STATUS.FAILED && <Warning />}
            <TertiaryButton
              id="action-download"
              icon={() => <Download />}
              onClick={() => {
                this.downloadApplication(
                  event as string,
                  id as string,
                  Action.LOAD_CERTIFICATE_APPLICATION
                )
              }}
            />
          </DownloadStatusIndicator>
        )
      }
      return (
        <ActionButton
          id="registrar_print"
          onClick={() =>
            this.props.goToPrintCertificate(
              (id && id.toString()) || '',
              (event && event.toLocaleLowerCase()) || ''
            )
          }
        >
          {this.props.intl.formatMessage(buttonMessages.print)}
        </ActionButton>
      )
    } else if (
      (applicationState === IN_PROGRESS ||
        applicationState === DECLARED ||
        applicationState === VALIDATED ||
        applicationState === REJECTED) &&
      this.userHasRegisterOrValidateScope()
    ) {
      if (downloadStatus !== DOWNLOAD_STATUS.DOWNLOADED) {
        return downloadStatus === DOWNLOAD_STATUS.DOWNLOADING ||
          downloadStatus === DOWNLOAD_STATUS.READY_TO_DOWNLOAD ? (
          <DownloadStatusIndicator>
            <span>{this.props.intl.formatMessage(messages.downloading)}</span>
            <Spinner id="action-loading" size={24} />
          </DownloadStatusIndicator>
        ) : (
          <DownloadStatusIndicator>
            {downloadStatus === DOWNLOAD_STATUS.FAILED && <Warning />}
            <TertiaryButton
              id="action-download"
              icon={() => <Download />}
              onClick={() => {
                this.downloadApplication(
                  event as string,
                  id as string,
                  Action.LOAD_REVIEW_APPLICATION
                )
              }}
            />
          </DownloadStatusIndicator>
        )
      }

      return (
        <ActionButton
          id="registrar_update"
          onClick={() =>
            this.props.goToPage(
              REVIEW_EVENT_PARENT_FORM_PAGE,
              (id && id.toString()) || '',
              'review',
              (event && event.toString()) || ''
            )
          }
        >
          {this.props.intl.formatMessage(buttonMessages.review)}
        </ActionButton>
      )
    } else {
      return undefined
    }
  }

  generateGqlHistorData = (data: GQLQuery): IHistoryData => {
    const registration =
      data.fetchRegistration && data.fetchRegistration.registration
    // @ts-ignore
    const informant = data.fetchRegistration && data.fetchRegistration.informant

    const history: IStatus[] =
      (registration &&
        registration.status &&
        registration.status.map((status, i) => {
          return generateHistoryEntry(
            (status && status.type) || null,
            (status && status.user && (status.user.name as GQLHumanName[])) ||
              null,
            (status && status.timestamp) || '',
            status && status.user && status.user.role
              ? this.props.intl.formatMessage(
                  userMessages[status.user.role as string]
                )
              : '',
            this.props.language === 'en'
              ? (status &&
                  status.office &&
                  status.office.name &&
                  (status.office.name as string)) ||
                  ''
              : (status &&
                  status.office &&
                  status.office.alias &&
                  status.office.alias.toString()) ||
                  '',
            this.props.language,
            registration && registration.trackingId,
            (registration && registration.contactPhoneNumber) ||
              (informant &&
                informant.individual.telecom &&
                informant.individual.telecom[0] &&
                informant.individual.telecom[0].value),
            status && status.type === REJECTED
              ? extractCommentFragmentValue(
                  status.comments as GQLComment[],
                  REJECT_REASON
                )
              : undefined,
            status && status.type === REJECTED
              ? extractCommentFragmentValue(
                  status.comments as GQLComment[],
                  REJECT_COMMENTS
                )
              : undefined
          )
        })) ||
      []
    const applicationState = history.length > 0 ? history[0].type : null
    const applicant: GQLPerson =
      // @ts-ignore
      (data.fetchRegistration && data.fetchRegistration.child) ||
      // @ts-ignore
      (data.fetchRegistration && data.fetchRegistration.deceased) ||
      null

    const event =
      registration && registration.type && (registration.type as string)
    const id =
      data.fetchRegistration &&
      data.fetchRegistration.id &&
      (data.fetchRegistration.id as string)

    const foundApplication = this.props.outboxApplications.find(
      application => application.id === id
    )

    const downloadStatus =
      (foundApplication && foundApplication.downloadStatus) || undefined
    return {
      title:
        (applicant &&
          applicant.name &&
          (createNamesMap(applicant.name as GQLHumanName[])[
            this.props.language
          ] as string)) ||
        '',
      history,
      action: applicationState
        ? this.getActionForStateAndScope(
            event,
            id,
            applicationState,
            downloadStatus
          )
        : undefined
    }
  }

  renderHistory(statuses: IStatus[]): JSX.Element[] | null {
    return (
      (
        statuses &&
        statuses.map((status, i) => {
          const { practitionerName, practitionerRole, officeName } = status
          return (
            <HistoryWrapper key={i} id={`history_row_${i}_${status.type}`}>
              {this.getWorkflowStatusIcon(status.type as string)}
              <StatusContainer>
                <LabelValue
                  label={this.props.intl.formatMessage(
                    this.getWorkflowDateLabel(status.type as string)
                  )}
                  value={status.timestamp || ''}
                />
                {(status.type === DraftStatus.FAILED && (
                  <StyledLabel>
                    {this.props.intl.formatMessage(errorMessages.draftFailed)}
                  </StyledLabel>
                )) || (
                  <ValueContainer>
                    <ValuesWithSeparator
                      strings={[
                        `${this.props.intl.formatMessage(
                          messages.by
                        )}: ${practitionerName}`,
                        practitionerRole,
                        (officeName && (officeName as string)) || ''
                      ]}
                      separator={<Separator />}
                    />
                  </ValueContainer>
                )}
                {status.contactNumber && (
                  <LabelValue
                    label={this.props.intl.formatMessage(
                      messages.applicantContactNumber
                    )}
                    value={status.contactNumber}
                  />
                )}
                {status.trackingId && (
                  <LabelValue
                    label={this.props.intl.formatMessage(messages.trackingId)}
                    value={status.trackingId}
                  />
                )}
                {status.rejectReason && (
                  <LabelValue
                    label={this.props.intl.formatMessage(messages.reason)}
                    value={status.rejectReason}
                  />
                )}
                {status.rejectComment && (
                  <LabelValue
                    label={this.props.intl.formatMessage(messages.comment)}
                    value={status.rejectComment}
                  />
                )}
              </StatusContainer>
            </HistoryWrapper>
          )
        })
      ).reverse() || null
    )
  }

  renderSubPage(historyData: IHistoryData) {
    return (
      <SubPage
        title={historyData.title}
        emptyTitle={this.props.intl.formatMessage(messages.noNameProvided)}
        goBack={this.props.goBack}
      >
        {this.renderHistory(historyData.history)}
        {historyData.action}
      </SubPage>
    )
  }

  render() {
    return (
      (this.props.draft &&
        this.renderSubPage(this.generateDraftHistoryData())) || (
        <>
          <Query
            query={FETCH_REGISTRATION_BY_COMPOSITION}
            variables={{
              id: this.props.applicationId
            }}
            fetchPolicy="no-cache"
          >
            {({
              loading,
              error,
              data
            }: {
              loading: any
              error?: any
              data: any
            }) => {
              if (loading) {
                return (
                  <SpinnerContainer>
                    <QuerySpinner
                      id="query-spinner"
                      baseColor={this.props.theme.colors.background}
                    />
                  </SpinnerContainer>
                )
              }
              return this.renderSubPage(this.generateGqlHistorData(data))
            }}
          </Query>
        </>
      )
    )
  }
}

function mapStateToProps(
  state: IStoreState,
  props: RouteComponentProps<{
    applicationId: string
  }>
) {
  const { match } = props
  return {
    language: state.i18n.language,
    userDetails: getUserDetails(state),
    scope: getScope(state),
    applicationId: match && match.params && match.params.applicationId,
    outboxApplications: state.applicationsState.applications,
    draft:
      (state.applicationsState.applications &&
        match &&
        match.params &&
        match.params.applicationId &&
        state.applicationsState.applications.find(
          application =>
            application.id === match.params.applicationId &&
            (application.submissionStatus ===
              SUBMISSION_STATUS[SUBMISSION_STATUS.DRAFT] ||
              application.submissionStatus ===
                SUBMISSION_STATUS[SUBMISSION_STATUS.FAILED])
        )) ||
      null
  }
}

export const Details = connect(
  mapStateToProps,
  {
    goToPage: goToPageAction,
    goBack: goBackAction,
    goToPrintCertificate: goToPrintCertificateAction,
    downloadApplication
  }
)(injectIntl(withTheme(withApollo(DetailView))))
