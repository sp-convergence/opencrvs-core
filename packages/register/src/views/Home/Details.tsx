import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { IApplication, SUBMISSION_STATUS } from 'src/applications'
import {
  goToTab as goToTabAction,
  goToHome as goToHomeAction
} from 'src/navigation'
import { getUserDetails } from 'src/profile/profileSelectors'
import { IStoreState } from 'src/store'
import { IUserDetails } from 'src/utils/userUtils'
import {
  StatusProgress,
  StatusOrange,
  StatusGreen,
  StatusCollected,
  StatusRejected
} from '@opencrvs/components/lib/icons'
import { SubPage, Spinner } from '@opencrvs/components/lib/interface'
import { defineMessages, InjectedIntlProps, injectIntl } from 'react-intl'
import { getDraftApplicantFullName } from 'src/utils/draftUtils'
import styled, { withTheme } from 'styled-components'
import {
  createNamesMap,
  extractCommentFragmentValue
} from 'src/utils/data-formatting'
import { formatLongDate } from 'src/utils/date-formatting'
import {
  GQLHumanName,
  GQLQuery,
  GQLPerson,
  GQLRegStatus,
  GQLComment
} from '@opencrvs/gateway/src/graphql/schema.d'
import { PrimaryButton } from '@opencrvs/components/lib/buttons'
import { Event } from '@opencrvs/register/src/forms'
import {
  DRAFT_BIRTH_PARENT_FORM,
  DRAFT_DEATH_FORM
} from 'src/navigation/routes'
import { Query } from 'react-apollo'
import { FETCH_REGISTRATION_BY_COMPOSITION } from './queries'
import * as Sentry from '@sentry/browser'
import { REJECTED, REJECT_REASON, REJECT_COMMENTS } from 'src/utils/constants'
import { ITheme } from '@opencrvs/components/lib/theme'

const HistoryWrapper = styled.div`
  padding: 10px 0px;
  flex: 1;
  display: flex;
  flex-direction: row;
  color: ${({ theme }) => theme.colors.copy};
  font-family: ${({ theme }) => theme.fonts.regularFont};
  &:last-child {
    margin-bottom: 0;
  }
`
const StyledLabel = styled.label`
  margin-right: 3px;
`
const StyledValue = styled.span`
  font-family: ${({ theme }) => theme.fonts.boldFont};
`
const Separator = styled.div`
  height: 20px;
  width: 1px;
  margin: 1px 8px;
  background: ${({ theme }) => theme.colors.copyAlpha80};
`
const ValueContainer = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  line-height: 1.3em;
`
const StatusContainer = styled.div`
  flex: 1;
  margin-left: 10px;
`
const ActionButton = styled(PrimaryButton)`
  margin: 20px 25px 30px;
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
  DRAFT_MODIFIED = 'DRAFT_MODIFIED'
}

interface IDetailProps {
  theme: ITheme
  language: string
  applicationId: string
  draft: IApplication
  userDetails: IUserDetails
  goToTab: typeof goToTabAction
  goToHome: typeof goToHomeAction
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

const messages = defineMessages({
  workflowStatusDateDraftStarted: {
    id: 'register.details.status.dateLabel.draft.started',
    defaultMessage: 'Started on',
    description:
      'Label for the workflow timestamp when the status is draft created'
  },
  workflowStatusDateDraftUpdated: {
    id: 'register.details.status.dateLabel.draft.updated',
    defaultMessage: 'Updated on',
    description:
      'Label for the workflow timestamp when the status is draft updated'
  },
  workflowStatusDateRegistered: {
    id: 'register.workQueue.listItem.status.dateLabel.registered',
    defaultMessage: 'Registrated on',
    description:
      'Label for the workflow timestamp when the status is registered'
  },
  workflowStatusDateRejected: {
    id: 'register.workQueue.listItem.status.dateLabel.rejected',
    defaultMessage: 'Rejected on',
    description: 'Label for the workflow timestamp when the status is rejected'
  },
  workflowStatusDateCollected: {
    id: 'register.workQueue.listItem.status.dateLabel.collected',
    defaultMessage: 'Printed on',
    description: 'Label for the workflow timestamp when the status is collected'
  },
  workflowPractitionerLabel: {
    id: 'register.workQueue.listItem.status.label.byPractitioner',
    defaultMessage: 'By',
    description: 'Label for the practitioner name in workflow'
  },
  workflowStatusDateApplication: {
    id: 'register.workQueue.listItem.status.dateLabel.application',
    defaultMessage: 'Application submitted on',
    description:
      'Label for the workflow timestamp when the status is application'
  },
  FIELD_AGENT: {
    id: 'register.home.header.FIELD_AGENT',
    defaultMessage: 'Field Agent',
    description: 'The description for FIELD_AGENT role'
  },
  REGISTRATION_CLERK: {
    id: 'register.home.header.REGISTRATION_CLERK',
    defaultMessage: 'Registration Clerk',
    description: 'The description for REGISTRATION_CLERK role'
  },
  LOCAL_REGISTRAR: {
    id: 'register.home.header.LOCAL_REGISTRAR',
    defaultMessage: 'Registrar',
    description: 'The description for LOCAL_REGISTRAR role'
  },
  DISTRICT_REGISTRAR: {
    id: 'register.home.header.DISTRICT_REGISTRAR',
    defaultMessage: 'District Registrar',
    description: 'The description for DISTRICT_REGISTRAR role'
  },
  STATE_REGISTRAR: {
    id: 'register.home.header.STATE_REGISTRAR',
    defaultMessage: 'State Registrar',
    description: 'The description for STATE_REGISTRAR role'
  },
  NATIONAL_REGISTRAR: {
    id: 'register.home.header.NATIONAL_REGISTRAR',
    defaultMessage: 'National Registrar',
    description: 'The description for NATIONAL_REGISTRAR role'
  },
  update: {
    id: 'register.workQueue.list.buttons.update',
    defaultMessage: 'Update',
    description: 'The title of update button in list item actions'
  },
  workflowApplicantNumber: {
    id: 'register.detail.status.applicant.number',
    defaultMessage: 'Applicant contact number',
    description: 'The title of contact number label'
  },
  workflowApplicantTrackingID: {
    id: 'register.duplicates.details.trackingId',
    defaultMessage: 'Tracking ID',
    description: 'Tracking ID label'
  },
  workflowApplicationRejectReason: {
    id: 'register.workQueue.labels.results.rejectionReason',
    defaultMessage: 'Reason',
    description: 'Label for rejection reason'
  },
  workflowApplicationRejectComment: {
    id: 'register.workQueue.labels.results.rejectionComment',
    defaultMessage: 'Comment',
    description: 'Label for rejection comment'
  },
  emptyTitle: {
    id: 'register.detail.subpage.emptyTitle',
    defaultMessage: 'No name provided',
    description: 'Label for empty title'
  }
})

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

class DetailView extends React.Component<IDetailProps & InjectedIntlProps> {
  getWorkflowDateLabel = (status: string) => {
    switch (status) {
      case 'DRAFT_STARTED':
        return messages.workflowStatusDateDraftStarted
      case 'DRAFT_MODIFIED':
        return messages.workflowStatusDateDraftUpdated
      case 'DECLARED':
        return messages.workflowStatusDateApplication
      case 'REGISTERED':
        return messages.workflowStatusDateRegistered
      case 'REJECTED':
        return messages.workflowStatusDateRejected
      case 'CERTIFIED':
        return messages.workflowStatusDateCollected
      default:
        return messages.workflowStatusDateApplication
    }
  }
  getWorkflowStatusIcon = (status: string) => {
    switch (status) {
      case 'DRAFT_STARTED':
        return <StatusProgress />
      case 'DRAFT_MODIFIED':
        return <StatusProgress />
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

  generateDraftHistorData = (): IHistoryData => {
    const { draft, userDetails } = this.props
    const history: IStatus[] = []
    if (draft.modifiedOn) {
      history.push(
        generateHistoryEntry(
          DraftStatus.DRAFT_MODIFIED,
          userDetails.name as GQLHumanName[],
          new Date(draft.modifiedOn).toString(),
          userDetails && userDetails.role
            ? this.props.intl.formatMessage(
                messages[userDetails.role as string]
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
    history.push(
      generateHistoryEntry(
        DraftStatus.DRAFT_STARTED,
        userDetails.name as GQLHumanName[],
        (draft.savedOn && new Date(draft.savedOn).toString()) || '',
        userDetails && userDetails.role
          ? this.props.intl.formatMessage(messages[userDetails.role as string])
          : '',
        (userDetails &&
          userDetails.primaryOffice &&
          userDetails.primaryOffice.name) ||
          '',
        this.props.language
      )
    )
    const tabRoute =
      draft.event === Event.BIRTH ? DRAFT_BIRTH_PARENT_FORM : DRAFT_DEATH_FORM
    const title = getDraftApplicantFullName(draft, this.props.language)
    return {
      title: title !== '' ? title : undefined,
      history,
      action: (
        <ActionButton
          id="draft_update"
          onClick={() =>
            this.props.goToTab(
              tabRoute,
              draft.id,
              '',
              (draft.event && draft.event.toString()) || ''
            )
          }
        >
          {this.props.intl.formatMessage(messages.update)}
        </ActionButton>
      )
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
                  messages[status.user.role as string]
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
    const currentState = history.length > 0 ? history[0].type : null
    const applicant: GQLPerson =
      // @ts-ignore
      (data.fetchRegistration && data.fetchRegistration.child) ||
      // @ts-ignore
      (data.fetchRegistration && data.fetchRegistration.deceased) ||
      null
    return {
      title:
        (applicant &&
          applicant.name &&
          (createNamesMap(applicant.name as GQLHumanName[])[
            this.props.language
          ] as string)) ||
        '',
      history,
      action:
        currentState && currentState === REJECTED ? (
          <ActionButton id="reject_update" disabled>
            {this.props.intl.formatMessage(messages.update)}
          </ActionButton>
        ) : (
          undefined
        )
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
                <ValueContainer>
                  <StyledLabel>
                    {this.props.intl.formatMessage(
                      messages.workflowPractitionerLabel
                    )}
                    :
                  </StyledLabel>
                  <ValuesWithSeparator
                    strings={[
                      practitionerName,
                      practitionerRole,
                      (officeName && (officeName as string)) || ''
                    ]}
                    separator={<Separator />}
                  />
                </ValueContainer>
                {status.contactNumber && (
                  <LabelValue
                    label={this.props.intl.formatMessage(
                      messages.workflowApplicantNumber
                    )}
                    value={status.contactNumber}
                  />
                )}
                {status.trackingId && (
                  <LabelValue
                    label={this.props.intl.formatMessage(
                      messages.workflowApplicantTrackingID
                    )}
                    value={status.trackingId}
                  />
                )}
                {status.rejectReason && (
                  <LabelValue
                    label={this.props.intl.formatMessage(
                      messages.workflowApplicationRejectReason
                    )}
                    value={status.rejectReason}
                  />
                )}
                {status.rejectComment && (
                  <LabelValue
                    label={this.props.intl.formatMessage(
                      messages.workflowApplicationRejectComment
                    )}
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
        emptyTitle={this.props.intl.formatMessage(messages.emptyTitle)}
        goBack={this.props.goToHome}
      >
        {this.renderHistory(historyData.history)}
        {historyData.action}
      </SubPage>
    )
  }

  render() {
    return (
      (this.props.draft &&
        this.renderSubPage(this.generateDraftHistorData())) || (
        <>
          <Query
            query={FETCH_REGISTRATION_BY_COMPOSITION}
            variables={{
              id: this.props.applicationId
            }}
          >
            {({ loading, error, data }) => {
              if (error) {
                Sentry.captureException(error)
                throw error
              } else if (loading) {
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
    applicationId: match && match.params && match.params.applicationId,
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
    goToTab: goToTabAction,
    goToHome: goToHomeAction
  }
)(injectIntl(withTheme(DetailView)))
