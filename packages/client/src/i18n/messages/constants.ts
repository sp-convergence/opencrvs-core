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
import { defineMessages, MessageDescriptor } from 'react-intl'

interface IConstantsMessages
  extends Record<string | number | symbol, MessageDescriptor> {
  countryName: MessageDescriptor
  address: MessageDescriptor
  allEvents: MessageDescriptor
  allStatuses: MessageDescriptor
  informantContactNumber: MessageDescriptor
  declaration: MessageDescriptor
  declarations: MessageDescriptor
  declarationArchivedOn: MessageDescriptor
  declarationCollectedOn: MessageDescriptor
  declarationFailedOn: MessageDescriptor
  declarationInformantLabel: MessageDescriptor
  applicationName: MessageDescriptor
  declarationRegisteredOn: MessageDescriptor
  declarationRejectedOn: MessageDescriptor
  declarationRequestedCorrectionOn: MessageDescriptor
  declarationStarted: MessageDescriptor
  declarationStartedBy: MessageDescriptor
  declarationStartedOn: MessageDescriptor
  declarationState: MessageDescriptor
  declarationSubmittedOn: MessageDescriptor
  declarationTitle: MessageDescriptor
  declarationUpdatedOn: MessageDescriptor
  declarationValidatedOn: MessageDescriptor
  declarationSentForExternalValidationOn: MessageDescriptor
  birth: MessageDescriptor
  births: MessageDescriptor
  by: MessageDescriptor
  certificationPaymentTitle: MessageDescriptor
  certified: MessageDescriptor
  collected: MessageDescriptor
  collectedBy: MessageDescriptor
  comment: MessageDescriptor
  certificateTitle: MessageDescriptor
  applicationTitle: MessageDescriptor
  formDeclarationTitle: MessageDescriptor
  customTimePeriod: MessageDescriptor
  dateOfDeclaration: MessageDescriptor
  death: MessageDescriptor
  deaths: MessageDescriptor
  declared: MessageDescriptor
  dob: MessageDescriptor
  dod: MessageDescriptor
  downloading: MessageDescriptor
  downloaded: MessageDescriptor
  eventDate: MessageDescriptor
  eventType: MessageDescriptor
  lastUpdated: MessageDescriptor
  startedAt: MessageDescriptor
  startedBy: MessageDescriptor
  export: MessageDescriptor
  failedToSend: MessageDescriptor
  from: MessageDescriptor
  gender: MessageDescriptor
  id: MessageDescriptor
  issuedBy: MessageDescriptor
  labelLanguage: MessageDescriptor
  labelPassword: MessageDescriptor
  labelPhone: MessageDescriptor
  labelPin: MessageDescriptor
  labelRole: MessageDescriptor
  last30Days: MessageDescriptor
  last12Months: MessageDescriptor
  lastEdited: MessageDescriptor
  month: MessageDescriptor
  name: MessageDescriptor
  newBirthRegistration: MessageDescriptor
  newDeathRegistration: MessageDescriptor
  noNameProvided: MessageDescriptor
  noResults: MessageDescriptor
  pendingConnection: MessageDescriptor
  performanceTitle: MessageDescriptor
  reason: MessageDescriptor
  requestReason: MessageDescriptor
  registered: MessageDescriptor
  inReviewStatus: MessageDescriptor
  incompleteStatus: MessageDescriptor
  requiresUpdatesStatus: MessageDescriptor
  registeredStatus: MessageDescriptor
  rejected: MessageDescriptor
  rejectedDays: MessageDescriptor
  relationship: MessageDescriptor
  requestedCorrection: MessageDescriptor
  review: MessageDescriptor
  search: MessageDescriptor
  sending: MessageDescriptor
  sentForUpdatesOn: MessageDescriptor
  sentOn: MessageDescriptor
  status: MessageDescriptor
  submissionStatus: MessageDescriptor
  timeFramesTitle: MessageDescriptor
  timeInProgress: MessageDescriptor
  timeReadyForReview: MessageDescriptor
  timeRequireUpdates: MessageDescriptor
  timeWatingApproval: MessageDescriptor
  timeWaitingExternalValidation: MessageDescriptor
  timeReadyToPrint: MessageDescriptor
  to: MessageDescriptor
  toCapitalized: MessageDescriptor
  trackingId: MessageDescriptor
  notificationSent: MessageDescriptor
  sentForReview: MessageDescriptor
  sentForValidation: MessageDescriptor
  sentForUpdates: MessageDescriptor
  sentForApproval: MessageDescriptor
  type: MessageDescriptor
  event: MessageDescriptor
  update: MessageDescriptor
  user: MessageDescriptor
  username: MessageDescriptor
  waitingToSend: MessageDescriptor
  week: MessageDescriptor
  location: MessageDescriptor
  maleUnder18: MessageDescriptor
  femaleUnder18: MessageDescriptor
  maleOver18: MessageDescriptor
  femaleOver18: MessageDescriptor
  total: MessageDescriptor
  registrationTitle: MessageDescriptor
  withinTargetDays: MessageDescriptor
  withinTargetDaysTo1Year: MessageDescriptor
  within1YearTo5Years: MessageDescriptor
  over5Years: MessageDescriptor
  waitingValidated: MessageDescriptor
  validated: MessageDescriptor
  loadMore: MessageDescriptor
  showMore: MessageDescriptor
  estimatedTargetDaysRegistrationTitle: MessageDescriptor
  estimatedNumberOfRegistartion: MessageDescriptor
  totalRegisteredInTargetDays: MessageDescriptor
  percentageOfEstimation: MessageDescriptor
  averageRateOfRegistrations: MessageDescriptor
  estimatedNumberOfEvents: MessageDescriptor
  registeredWithinTargetd: MessageDescriptor
  registeredInTargetd: MessageDescriptor
  timePeriod: MessageDescriptor
  totalRegistered: MessageDescriptor
  viewAll: MessageDescriptor
  notAvailable: MessageDescriptor
  history: MessageDescriptor
  requireUpdatesLoading: MessageDescriptor
  noConnection: MessageDescriptor
  action: MessageDescriptor
  date: MessageDescriptor
  totalFileSizeExceed: MessageDescriptor
  refresh: MessageDescriptor
}
const messagesToDefine: IConstantsMessages = {
  countryName: {
    defaultMessage: 'Farajaland',
    description: 'Name of the OpenCRVS implementation country',
    id: 'constants.countryName'
  },
  address: {
    defaultMessage: 'Address',
    description: 'Label for address',
    id: 'constants.address'
  },
  allEvents: {
    defaultMessage: 'All events',
    description: 'Label for select option All events',
    id: 'constants.allEvents'
  },
  allStatuses: {
    defaultMessage: 'All statuses',
    description: 'Label for select option All statuses',
    id: 'constants.allStatuses'
  },
  informantContactNumber: {
    defaultMessage: 'Informant contact number',
    description: 'The title of contact number label',
    id: 'constants.informantContactNumber'
  },
  declaration: {
    defaultMessage: 'declaration',
    description: 'A label for declaration',
    id: 'constants.declaration'
  },
  declarations: {
    defaultMessage: 'Declarations ({totalItems})',
    description: 'A label for declarations count',
    id: 'constants.declarationsCount'
  },
  declarationArchivedOn: {
    defaultMessage: 'Application archived on',
    description: 'Label for the workflow timestamp when the status is archived',
    id: 'constants.declrationArchivedOn'
  },
  declarationCollectedOn: {
    defaultMessage: 'Certificate collected on',
    description:
      'Label for the workflow timestamp when the status is collected',
    id: 'constants.declarationCollectedOn'
  },
  declarationFailedOn: {
    defaultMessage: 'Failed to send on',
    description: 'Label for the workflow timestamp when the status is failed',
    id: 'constants.declarationFailedOn'
  },
  declarationInformantLabel: {
    defaultMessage: 'Informant',
    description: 'Informant Label',
    id: 'constants.informant'
  },
  applicationName: {
    defaultMessage: 'OpenCRVS',
    description: 'Declaration name of CRVS',
    id: 'constants.applicationName'
  },
  declarationRegisteredOn: {
    defaultMessage: 'Declaration registered on',
    description:
      'Label for the workflow timestamp when the status is registered',
    id: 'constants.declarationRegisteredOn'
  },
  declarationRejectedOn: {
    defaultMessage: 'Declaration sent for updates on',
    description: 'Label for the workflow timestamp when the status is rejected',
    id: 'constants.declarationRejectedOn'
  },
  declarationRequestedCorrectionOn: {
    defaultMessage: 'Declaration requested correction on',
    description:
      'Label for the workflow timestamp when the status is requested correction',
    id: 'constants.declarationRequestedCorrectionOn'
  },
  declarationStarted: {
    defaultMessage: 'Started',
    description: 'Label for table header column Declaration started',
    id: 'constants.declarationStarted'
  },
  declarationStartedBy: {
    defaultMessage: 'Started by',
    description: 'Label for table header column Started by',
    id: 'constants.declarationStartedBy'
  },
  declarationStartedOn: {
    defaultMessage: 'Started on',
    description:
      'Label for the workflow timestamp when the status is draft created',
    id: 'constants.declarationStartedOn'
  },
  declarationState: {
    defaultMessage: 'Declaration {action} on',
    description: 'A label to describe when the declaration was actioned on',
    id: 'constants.declarationState'
  },
  declarationSubmittedOn: {
    defaultMessage: 'Declaration submitted on',
    description:
      'Label for the workflow timestamp when the status is declaration',
    id: 'constants.declarationSubmittedOn'
  },
  declarationTitle: {
    defaultMessage: 'Declarations',
    description: 'Declaration title',
    id: 'constants.declarations'
  },
  declarationUpdatedOn: {
    defaultMessage: 'Updated on',
    description:
      'Label for the workflow timestamp when the status is draft updated',
    id: 'constants.declarationUpdatedOn'
  },
  declarationValidatedOn: {
    defaultMessage: 'Declaration reviewed on',
    description:
      'Label for the workflow timestamp when the status is validated',
    id: 'constants.declarationValidatedOn'
  },
  declarationSentForExternalValidationOn: {
    defaultMessage: 'Declaration sent for external validation on',
    description:
      'Label for the workflow timestamp when the status is waiting_validation',
    id: 'constants.declarationSentForExternalValidationOn'
  },
  birth: {
    defaultMessage: 'Birth',
    description: 'A label from the birth event',
    id: 'constants.birth'
  },
  births: {
    defaultMessage: 'Births',
    description: 'A label from the births event',
    id: 'constants.births'
  },
  by: {
    defaultMessage: 'By',
    description: 'Label for By (the person who performed the action)',
    id: 'constants.by'
  },
  action: {
    defaultMessage: 'Action',
    description: 'Action Label',
    id: 'constants.label.action'
  },
  date: {
    defaultMessage: 'Date',
    description: 'Date Label',
    id: 'constants.label.date'
  },
  certificationPaymentTitle: {
    defaultMessage:
      'Payment collected for {event, select, birth{birth} death{death} other{birth}} certificates',
    description: 'Label for certification payment performance reports',
    id: 'constants.certificationPaymentTitle'
  },
  certified: {
    defaultMessage: 'certified',
    description: 'A label for certified',
    id: 'constants.certified'
  },
  collected: {
    defaultMessage: 'collected',
    description: 'The status label for collected',
    id: 'constants.collected'
  },
  collectedBy: {
    defaultMessage: 'Collected by',
    description: 'The collected by sec text',
    id: 'constants.collectedBy'
  },
  comment: {
    defaultMessage: 'Comment',
    description: 'Label for rejection comment',
    id: 'constants.comment'
  },
  certificateTitle: {
    defaultMessage: 'Certificate',
    description: 'Certificate title',
    id: 'constants.certificate.title'
  },
  applicationTitle: {
    defaultMessage: 'Application',
    description: 'Application title',
    id: 'constants.application.title'
  },
  formDeclarationTitle: {
    defaultMessage: 'Declaration forms',
    description: 'Form Declaration title',
    id: 'constants.form.title'
  },
  customTimePeriod: {
    defaultMessage: 'Custom time period',
    description: 'Label for Custom time period',
    id: 'constants.customTimePeriod'
  },
  dateOfDeclaration: {
    defaultMessage: 'Date of declaration',
    description: 'Date of declaration label',
    id: 'constants.dateOfDeclaration'
  },
  death: {
    defaultMessage: 'Death',
    description: 'A label from the death event',
    id: 'constants.death'
  },
  deaths: {
    defaultMessage: 'Deaths',
    description: 'A label from the deaths event',
    id: 'constants.deaths'
  },
  declared: {
    defaultMessage: 'submitted',
    description: 'A label for submitted',
    id: 'constants.submitted'
  },
  dob: {
    defaultMessage: 'D.o.B.',
    description: 'Date of birth label',
    id: 'constants.dob'
  },
  dod: {
    defaultMessage: 'D.o.D',
    description: 'Label for DoD in work queue list item',
    id: 'constants.dod'
  },
  downloading: {
    defaultMessage: 'Downloading...',
    description: 'Label for declaration download status Downloading',
    id: 'constants.downloading'
  },
  downloaded: {
    defaultMessage: 'Downloaded',
    description: 'Label for application download status Downloaded',
    id: 'constants.downloaded'
  },
  eventDate: {
    defaultMessage: 'Date of event',
    description: 'Label for event date in list item',
    id: 'constants.eventDate'
  },
  eventType: {
    defaultMessage: 'Event',
    description: 'Label for table header column Event type',
    id: 'constants.eventType'
  },
  lastUpdated: {
    defaultMessage: 'Last updated',
    description: 'Label for Last updated in list item',
    id: 'constants.lastUpdated'
  },
  startedAt: {
    defaultMessage: 'Started',
    description: 'Label for Started At in list item',
    id: 'constants.startedAt'
  },
  startedBy: {
    defaultMessage: 'Started by',
    description: 'Label for Started by in list item',
    id: 'constants.startedBy'
  },
  export: {
    defaultMessage: 'Export',
    description: 'Label used for export',
    id: 'constants.export'
  },
  failedToSend: {
    defaultMessage: 'Failed to send',
    description: 'Label for declaration status Failed',
    id: 'constants.failedToSend'
  },
  from: {
    defaultMessage: 'From',
    description: 'Label for text From',
    id: 'constants.from'
  },
  gender: {
    defaultMessage: 'Gender',
    description: 'Gender label',
    id: 'constants.gender'
  },
  id: {
    defaultMessage: 'ID',
    description: 'ID Label',
    id: 'constants.id'
  },
  issuedBy: {
    defaultMessage: 'Issued by',
    description: 'The issued by sec text',
    id: 'constants.issuedBy'
  },
  labelLanguage: {
    defaultMessage: 'Language',
    description: 'language label',
    id: 'constants.language'
  },
  labelPassword: {
    defaultMessage: 'Password',
    description: 'Password label',
    id: 'constants.password'
  },
  labelPhone: {
    defaultMessage: 'Phone number',
    description: 'Phone label',
    id: 'constants.phoneNumber'
  },
  labelPin: {
    defaultMessage: 'PIN',
    description: 'PIN label',
    id: 'constants.PIN'
  },
  labelRole: {
    defaultMessage: 'Role',
    description: 'Role label',
    id: 'constants.role'
  },
  last30Days: {
    defaultMessage: 'Last 30 days',
    description: 'Label for  preset date range Last 30 days',
    id: 'constants.last30Days'
  },
  last12Months: {
    defaultMessage: 'Last 12 months',
    description: 'Label for preset date range Last 12 months',
    id: 'constants.last12Months'
  },
  lastEdited: {
    defaultMessage: 'Last edited',
    description: 'Label for rejection date in work queue list item',
    id: 'constants.lastEdited'
  },
  month: {
    defaultMessage: 'Month',
    description: 'Label for month',
    id: 'constants.month'
  },
  name: {
    defaultMessage: 'Name',
    description: 'Name label',
    id: 'constants.name'
  },
  newBirthRegistration: {
    id: 'register.selectInformant.newBirthRegistration',
    defaultMessage: 'New birth declaration',
    description: 'The title that appears for new birth registrations'
  },
  newDeathRegistration: {
    id: 'register.selectInformant.newDeathRegistration',
    defaultMessage: 'New death declaration',
    description: 'The title that appears for new death registrations'
  },
  noNameProvided: {
    defaultMessage: 'No name provided',
    description: 'Label for empty title',
    id: 'constants.noNameProvided'
  },
  noResults: {
    defaultMessage: 'No result',
    description:
      'Text to display if the search return no results for the current filters',
    id: 'constants.noResults'
  },
  over5Years: {
    defaultMessage: 'Over 5 years',
    description: 'Label for registrations over 5 years',
    id: 'constants.over5Years'
  },
  pendingConnection: {
    defaultMessage: 'Pending connection',
    description: 'Label for declaration status Pending Connection',
    id: 'constants.pendingConnection'
  },
  performanceTitle: {
    defaultMessage: 'Performance',
    description: 'Performance title',
    id: 'constants.performance'
  },
  reason: {
    defaultMessage: 'Reason',
    description: 'Label for Reason the declaration was rejected',
    id: 'constants.reason'
  },
  requestReason: {
    defaultMessage: 'Reason for request',
    description: 'Label for Reason the declaration was corrected',
    id: 'constants.requestReason'
  },
  registered: {
    defaultMessage: 'Registered',
    description: 'A label for registered',
    id: 'constants.registered'
  },
  inReviewStatus: {
    defaultMessage: 'In Review',
    description: 'A label for In Review',
    id: 'constants.inReview.status'
  },
  incompleteStatus: {
    defaultMessage: 'Incomplete',
    description: 'A label for Incomplete',
    id: 'constants.incomplete.status'
  },
  requiresUpdatesStatus: {
    defaultMessage: 'Requires updates',
    description: 'A label for Requires updates',
    id: 'constants.requiresUpdates.status'
  },
  registeredStatus: {
    defaultMessage: 'Registered',
    description: 'A label for registered',
    id: 'constants.registered.status'
  },
  rejected: {
    defaultMessage: 'rejected',
    description: 'A label for rejected',
    id: 'constants.rejected'
  },
  rejectedDays: {
    defaultMessage: 'Sent for updates {text}',
    description: 'The title of rejected days of declaration',
    id: 'constants.rejectedDays'
  },
  relationship: {
    defaultMessage: 'Relationship',
    description: 'Relationship Label for death',
    id: 'constants.relationship'
  },
  requestedCorrection: {
    id: 'constants.requestedCorrection',
    defaultMessage: 'requested correction',
    description: 'A label for requested correction'
  },
  review: {
    defaultMessage: 'Review',
    description: 'A label from the review button',
    id: 'constants.review'
  },
  search: {
    defaultMessage: 'Search',
    description: 'The title of the page',
    id: 'constants.search'
  },
  sending: {
    defaultMessage: 'Sending...',
    description: 'Label for declaration status Submitting',
    id: 'constants.sending'
  },
  sentForUpdatesOn: {
    defaultMessage: 'Sent for updates on',
    description: 'Label for rejection date in work queue list item',
    id: 'constants.sentForUpdatesOn'
  },
  sentOn: {
    defaultMessage: 'Sent on',
    description: 'Label for rejection date in work queue list item',
    id: 'constants.sentOn'
  },
  status: {
    defaultMessage: 'Status',
    description: 'Title for column',
    id: 'constants.status'
  },
  submissionStatus: {
    defaultMessage: 'Submission status',
    description: 'Label for table header of column Submission status',
    id: 'constants.submissionStatus'
  },
  timeFramesTitle: {
    defaultMessage:
      '{event, select, birth{Birth} death{Death} other{Birth}} registered by time period, from date of occurrence',
    description: 'Header for tabel performance timeframs',
    id: 'constants.timeFramesTitle'
  },
  timeInProgress: {
    defaultMessage: 'Time in progress',
    description: 'Label for column Time in progress',
    id: 'constants.timeInProgress'
  },
  timeReadyForReview: {
    defaultMessage: 'Time in ready for review',
    description: 'Label for column Time in ready for review',
    id: 'constants.timeReadyForReview'
  },
  timeRequireUpdates: {
    defaultMessage: 'Time in require updates',
    description: 'Label for column Time in require updates',
    id: 'constants.timeRequireUpdates'
  },
  timeWatingApproval: {
    defaultMessage: 'Time in waiting for approval',
    description: 'Label for column Time in waiting for approval',
    id: 'constants.timeWatingApproval'
  },
  timeWaitingExternalValidation: {
    defaultMessage: 'Time in external validation',
    description: 'Label for column Time in external validation BRIS',
    id: 'constants.timeWaitingExternalValidation'
  },
  timeReadyToPrint: {
    defaultMessage: 'Time in ready to print',
    description: 'Label for column Time in ready to print',
    id: 'constants.timeReadyToPrint'
  },
  to: {
    defaultMessage: 'to',
    description: 'Used in sentence',
    id: 'constants.to'
  },
  toCapitalized: {
    defaultMessage: 'To',
    description: 'Label for To',
    id: 'constants.toCapitalized'
  },
  trackingId: {
    defaultMessage: 'Tracking ID',
    description: 'Search menu tracking id type',
    id: 'constants.trackingId'
  },
  notificationSent: {
    defaultMessage: 'Notification sent',
    description: 'label for notification sent',
    id: 'constants.notificationSent'
  },
  sentForReview: {
    defaultMessage: 'Sent for review',
    description: 'label for sent for review',
    id: 'constants.sentForReview'
  },
  sentForValidation: {
    defaultMessage: 'Sent for validation',
    description: 'label for sent for validation',
    id: 'constants.sentForValidation'
  },
  sentForUpdates: {
    defaultMessage: 'Sent for updates',
    description: 'label for sent for updates',
    id: 'constants.sentForUpdates'
  },
  sentForApproval: {
    defaultMessage: 'Sent for approval',
    description: 'label for sent for approval',
    id: 'constants.sentForApproval'
  },
  type: {
    defaultMessage: 'Type',
    description: 'Label for type of event in work queue list item',
    id: 'constants.type'
  },
  event: {
    defaultMessage: 'Event',
    description: 'Label for Event of event in work queue list item',
    id: 'constants.event'
  },
  update: {
    defaultMessage: 'Update',
    description: 'The title of reject button in list item actions',
    id: 'constants.update'
  },
  user: {
    defaultMessage: 'User',
    description: 'The name of the user form',
    id: 'constants.user'
  },
  username: {
    defaultMessage: 'Username',
    description: 'Username',
    id: 'constants.username'
  },
  waitingToSend: {
    defaultMessage: 'Waiting to send',
    description: 'Label for declaration status Ready to Submit',
    id: 'constants.waitingToSend'
  },
  week: {
    defaultMessage: 'Week',
    description: 'Label for week',
    id: 'constants.week'
  },
  maleUnder18: {
    defaultMessage: 'Male Under 18',
    description: 'Label for maleUnder18',
    id: 'constants.maleUnder18'
  },
  femaleUnder18: {
    defaultMessage: 'Female Under 18',
    description: 'Label for femaleUnder18',
    id: 'constants.femaleUnder18'
  },
  maleOver18: {
    defaultMessage: 'Male Over 18',
    description: 'Label for maleOver18',
    id: 'constants.maleOver18'
  },
  femaleOver18: {
    defaultMessage: 'Female Over 18',
    description: 'Label for femaleOver18',
    id: 'constants.femaleOver18'
  },
  total: {
    defaultMessage: 'Total',
    description: 'Label for total',
    id: 'constants.total'
  },
  location: {
    defaultMessage: 'Location',
    description: 'Label for location',
    id: 'constants.location'
  },
  registrationTitle: {
    defaultMessage: '{event, select, birth{Birth} death{Death}} Registered',
    description: 'Label for registrationTitle',
    id: 'constants.registrationTitle'
  },
  withinTargetDays: {
    defaultMessage: `Within {registrationTargetDays} days`,
    description: `Label for registrations within {registrationTargetDays} days`,
    id: 'constants.withinTargetDays'
  },
  withinTargetDaysTo1Year: {
    defaultMessage: `{registrationTargetDays} days - 1 year`,
    description: `Label for registrations within {registrationTargetDays} days to 1 year`,
    id: 'constants.withinTargetDaysTo1Year'
  },
  within1YearTo5Years: {
    defaultMessage: '1 year - 5 years',
    description: 'Label for registrations within 1 year to 5 years',
    id: 'constants.within1YearTo5Years'
  },
  waitingValidated: {
    defaultMessage: 'Waiting for validation',
    description: 'A label for waitingValidated',
    id: 'constants.waitingValidated'
  },
  validated: {
    id: 'constants.validated',
    defaultMessage: 'validated',
    description: 'A label for validated'
  },
  loadMore: {
    id: 'constants.loadMore',
    defaultMessage: 'Load more',
    description: 'A label for load more'
  },
  showMore: {
    id: 'constants.showMore',
    defaultMessage: 'Show next {pageSize}',
    description: 'Label for show more link'
  },
  estimatedTargetDaysRegistrationTitle: {
    id: 'constants.estimatedTargetDaysRegistrationTitle',
    defaultMessage: `Estimated vs total registered in {registrationTargetDays} days`,
    description: `A label for estimated vs total registered in {registrationTargetDays} days`
  },
  estimatedNumberOfRegistartion: {
    id: 'constants.estimatedNumberOfRegistartion',
    defaultMessage: 'Estimated no. of registrations',
    description: 'A label for estimated no. of registrations'
  },
  totalRegisteredInTargetDays: {
    id: 'constants.totalRegisteredInTargetDays',
    defaultMessage: `Total registered in {registrationTargetDays} days`,
    description: `A label for total registered in {registrationTargetDays} days`
  },
  percentageOfEstimation: {
    id: 'constants.percentageOfEstimation',
    defaultMessage: 'Percentage of estimate',
    description: 'A label for percentage of estimate'
  },
  totalRegistered: {
    id: 'constants.totalRegistered',
    defaultMessage: 'Total registered',
    description: 'A label for Total registered'
  },
  averageRateOfRegistrations: {
    id: 'constants.averageRateOfRegistrations',
    defaultMessage: 'avg. {amount}%',
    description: 'A label for Average rate of registrations'
  },
  estimatedNumberOfEvents: {
    id: 'constants.estimatedNumberOfEvents',
    defaultMessage:
      'Estimated no. of {eventType, select, birth {birth} death {death} other {birth}}s',
    description: 'A label for Estimated number of events'
  },

  registeredWithinTargetd: {
    id: 'constants.registeredWithinTargetd',
    defaultMessage: `Registered within\n{registrationTargetDays} days of event`,
    description: `A label for Registered {registrationTargetDays} within  days of event`
  },
  registeredInTargetd: {
    id: 'constants.registeredInTargetd',
    defaultMessage: `Registered in {registrationTargetDays} days`,
    description: `A label for Registered in {registrationTargetDays} days`
  },
  timePeriod: {
    id: 'constants.timePeriod',
    defaultMessage: 'Time period',
    description: 'A label for Time period'
  },
  viewAll: {
    id: 'constants.viewAll',
    defaultMessage: 'View all',
    description: 'Label for view all link'
  },
  notAvailable: {
    id: 'constants.notAvailable',
    defaultMessage: 'Not available',
    description: 'Placeholder for empty value'
  },
  history: {
    id: 'constants.history',
    defaultMessage: 'History',
    description: 'History heading'
  },
  requireUpdatesLoading: {
    id: 'constants.requireUpdatesLoading',
    defaultMessage: 'Checking your declarations',
    description: 'The text when all rejected declarations are loading'
  },
  noConnection: {
    defaultMessage: 'No connection',
    description: 'No Connection hover text',
    id: 'constants.noConnection'
  },
  totalFileSizeExceed: {
    defaultMessage:
      'Total size of documents exceeds {fileSize}. Please reduce file size of your uploads',
    description: 'Accumulated File size exceed message',
    id: 'constants.totalFileSizeExceed'
  },
  refresh: {
    defaultMessage: 'Refresh',
    description: 'label for refresh',
    id: 'constants.refresh'
  }
}

export const constantsMessages: Record<
  string | number | symbol,
  MessageDescriptor
> = defineMessages(messagesToDefine)

const dynamicMessagesToDefine: Record<
  string | number | symbol,
  MessageDescriptor
> = {
  declared: {
    id: 'constants.submitted',
    defaultMessage: 'submitted',
    description: 'A label for submitted'
  },
  rejected: {
    id: 'constants.rejected',
    defaultMessage: 'rejected',
    description: 'A label for rejected'
  },
  registered: {
    id: 'constants.registered',
    defaultMessage: 'registered',
    description: 'A label for registered'
  },
  requestedCorrection: {
    id: 'constants.requestedCorrection',
    defaultMessage: 'requested correction',
    description: 'A label for requested correction'
  },
  certified: {
    id: 'constants.certified',
    defaultMessage: 'certified',
    description: 'A label for certified'
  },
  validated: {
    id: 'constants.validated',
    defaultMessage: 'validated',
    description: 'A label for validated'
  },
  updated: {
    defaultMessage: 'Updated',
    description: 'Application has been updated',
    id: 'constants.updated'
  },
  sent_incomplete: {
    defaultMessage: 'Sent incomplete',
    description: 'Declaration submitted without completing the required fields',
    id: 'constants.sent_incomplete'
  },
  updated_declaration: {
    defaultMessage: 'Updated declaration',
    description: 'Declaration has been updated',
    id: 'constants.updated_declaration'
  },
  archived_declaration: {
    defaultMessage: 'Archived',
    description: 'Application has been archived',
    id: 'constants.archived_declaration'
  },
  waitingValidation: {
    id: 'constants.waitingValidation',
    defaultMessage: 'sent for validation',
    description: 'A label for waitingValidation'
  },
  male: {
    id: 'constants.male',
    defaultMessage: 'Male',
    description: 'The duplicates text for male'
  },
  female: {
    id: 'constants.female',
    defaultMessage: 'Female',
    description: 'The duplicates text for female'
  },
  birth: {
    id: 'constants.birth',
    defaultMessage: 'Birth',
    description: 'A label from the birth event'
  },
  death: {
    id: 'constants.death',
    defaultMessage: 'Death',
    description: 'A label from the death event'
  },
  father: {
    id: 'form.field.label.informantRelation.father',
    defaultMessage: 'Father',
    description: 'Label for option Father'
  },
  mother: {
    id: 'form.field.label.informantRelation.mother',
    defaultMessage: 'Mother',
    description: 'Label for option Mother'
  },
  spouse: {
    id: 'form.field.label.informantRelation.spouse',
    defaultMessage: 'Spouse',
    description: 'Label for option Spouse'
  },
  son: {
    id: 'form.field.label.informantRelation.son',
    defaultMessage: 'Son',
    description: 'Label for option Son'
  },
  daughter: {
    id: 'form.field.label.informantRelation.daughter',
    defaultMessage: 'Daughter',
    description: 'Label for option Daughter'
  },
  MOTHER: {
    id: 'form.field.label.informantRelation.mother',
    defaultMessage: 'Mother',
    description: 'Label for option Mother'
  },
  FATHER: {
    id: 'form.field.label.informantRelation.father',
    defaultMessage: 'Father',
    description: 'Label for option Father'
  },
  BOTH_PARENTS: {
    id: 'register.selectInformant.parents',
    defaultMessage: 'Mother & Father',
    description:
      'The description that appears when selecting the parent as informant'
  },
  SELF: {
    defaultMessage: 'Self',
    description: 'The title that appears when selecting self as informant',
    id: 'form.field.label.self'
  },
  OTHER: {
    defaultMessage: 'Someone else',
    description: 'Other Label',
    id: 'form.field.label.someoneElse'
  },
  SPOUSE: {
    id: 'form.field.label.informantRelation.spouse',
    defaultMessage: 'Spouse',
    description: 'Label for option Spouse'
  },
  SON: {
    id: 'form.field.label.informantRelation.son',
    defaultMessage: 'Son',
    description: 'Label for option Son'
  },
  DAUGHTER: {
    id: 'form.field.label.informantRelation.daughter',
    defaultMessage: 'Daughter',
    description: 'Label for option Daughter'
  },
  EXTENDED_FAMILY: {
    defaultMessage: 'Extended Family',
    description: 'Label for option Extended Family',
    id: 'form.field.label.informantRelation.extendedFamily'
  },
  SOMEONE_ELSE: {
    defaultMessage: 'Someone else',
    description: 'Other Label',
    id: 'form.field.label.someoneElse'
  },
  INFORMANT: {
    defaultMessage: 'Informant',
    description: 'Informant Label',
    id: 'form.field.label.informant'
  }
}

export const dynamicConstantsMessages: Record<
  string | number | symbol,
  MessageDescriptor
> = defineMessages(dynamicMessagesToDefine)

const countryMessagesToDefine: Record<
  string | number | symbol,
  MessageDescriptor
> = {
  AFG: {
    id: 'countries.AFG',
    defaultMessage: 'Afghanistan',
    description: 'ISO Country: AFG'
  },
  ALA: {
    id: 'countries.ALA',
    defaultMessage: 'Åland Islands',
    description: 'ISO Country: ALA'
  },
  ALB: {
    id: 'countries.ALB',
    defaultMessage: 'Albania',
    description: 'ISO Country: ALB'
  },
  DZA: {
    id: 'countries.DZA',
    defaultMessage: 'Algeria',
    description: 'ISO Country: DZA'
  },
  ASM: {
    id: 'countries.ASM',
    defaultMessage: 'American Samoa',
    description: 'ISO Country: ASM'
  },
  AND: {
    id: 'countries.AND',
    defaultMessage: 'Andorra',
    description: 'ISO Country: AND'
  },
  AGO: {
    id: 'countries.AGO',
    defaultMessage: 'Angola',
    description: 'ISO Country: AGO'
  },
  AIA: {
    id: 'countries.AIA',
    defaultMessage: 'Anguilla',
    description: 'ISO Country: AIA'
  },
  ATA: {
    id: 'countries.ATA',
    defaultMessage: 'Antarctica',
    description: 'ISO Country: ATA'
  },
  ATG: {
    id: 'countries.ATG',
    defaultMessage: 'Antigua and Barbuda',
    description: 'ISO Country: ATG'
  },
  ARG: {
    id: 'countries.ARG',
    defaultMessage: 'Argentina',
    description: 'ISO Country: ARG'
  },
  ARM: {
    id: 'countries.ARM',
    defaultMessage: 'Armenia',
    description: 'ISO Country: ARM'
  },
  ABW: {
    id: 'countries.ABW',
    defaultMessage: 'Aruba',
    description: 'ISO Country: ABW'
  },
  AUS: {
    id: 'countries.AUS',
    defaultMessage: 'Australia',
    description: 'ISO Country: AUS'
  },
  AUT: {
    id: 'countries.AUT',
    defaultMessage: 'Austria',
    description: 'ISO Country: AUT'
  },
  AZE: {
    id: 'countries.AZE',
    defaultMessage: 'Azerbaijan',
    description: 'ISO Country: AZE'
  },
  BHS: {
    id: 'countries.BHS',
    defaultMessage: 'Bahamas',
    description: 'ISO Country: BHS'
  },
  BHR: {
    id: 'countries.BHR',
    defaultMessage: 'Bahrain',
    description: 'ISO Country: BHR'
  },
  BGD: {
    id: 'countries.BGD',
    defaultMessage: 'Bangladesh',
    description: 'ISO Country: BGD'
  },
  BRB: {
    id: 'countries.BRB',
    defaultMessage: 'Barbados',
    description: 'ISO Country: BRB'
  },
  BLR: {
    id: 'countries.BLR',
    defaultMessage: 'Belarus',
    description: 'ISO Country: BLR'
  },
  BEL: {
    id: 'countries.BEL',
    defaultMessage: 'Belgium',
    description: 'ISO Country: BEL'
  },
  BLZ: {
    id: 'countries.BLZ',
    defaultMessage: 'Belize',
    description: 'ISO Country: BLZ'
  },
  BEN: {
    id: 'countries.BEN',
    defaultMessage: 'Benin',
    description: 'ISO Country: BEN'
  },
  BMU: {
    id: 'countries.BMU',
    defaultMessage: 'Bermuda',
    description: 'ISO Country: BMU'
  },
  BTN: {
    id: 'countries.BTN',
    defaultMessage: 'Bhutan',
    description: 'ISO Country: BTN'
  },
  BOL: {
    id: 'countries.BOL',
    defaultMessage: 'Bolivia (Plurinational State of)',
    description: 'ISO Country: BOL'
  },
  BES: {
    id: 'countries.BES',
    defaultMessage: 'Bonaire, Sint Eustatius and Saba',
    description: 'ISO Country: BES'
  },
  BIH: {
    id: 'countries.BIH',
    defaultMessage: 'Bosnia and Herzegovina',
    description: 'ISO Country: BIH'
  },
  BWA: {
    id: 'countries.BWA',
    defaultMessage: 'Botswana',
    description: 'ISO Country: BWA'
  },
  BVT: {
    id: 'countries.BVT',
    defaultMessage: 'Bouvet Island',
    description: 'ISO Country: BVT'
  },
  BRA: {
    id: 'countries.BRA',
    defaultMessage: 'Brazil',
    description: 'ISO Country: BRA'
  },
  IOT: {
    id: 'countries.IOT',
    defaultMessage: 'British Indian Ocean Territory',
    description: 'ISO Country: IOT'
  },
  VGB: {
    id: 'countries.VGB',
    defaultMessage: 'British Virgin Islands',
    description: 'ISO Country: VGB'
  },
  BRN: {
    id: 'countries.BRN',
    defaultMessage: 'Brunei Darussalam',
    description: 'ISO Country: BRN'
  },
  BGR: {
    id: 'countries.BGR',
    defaultMessage: 'Bulgaria',
    description: 'ISO Country: BGR'
  },
  BFA: {
    id: 'countries.BFA',
    defaultMessage: 'Burkina Faso',
    description: 'ISO Country: BFA'
  },
  BDI: {
    id: 'countries.BDI',
    defaultMessage: 'Burundi',
    description: 'ISO Country: BDI'
  },
  CPV: {
    id: 'countries.CPV',
    defaultMessage: 'Cabo Verde',
    description: 'ISO Country: CPV'
  },
  KHM: {
    id: 'countries.KHM',
    defaultMessage: 'Cambodia',
    description: 'ISO Country: KHM'
  },
  CMR: {
    id: 'countries.CMR',
    defaultMessage: 'Cameroon',
    description: 'ISO Country: CMR'
  },
  CAN: {
    id: 'countries.CAN',
    defaultMessage: 'Canada',
    description: 'ISO Country: CAN'
  },
  CYM: {
    id: 'countries.CYM',
    defaultMessage: 'Cayman Islands',
    description: 'ISO Country: CYM'
  },
  CAF: {
    id: 'countries.CAF',
    defaultMessage: 'Central African Republic',
    description: 'ISO Country: CAF'
  },
  TCD: {
    id: 'countries.TCD',
    defaultMessage: 'Chad',
    description: 'ISO Country: TCD'
  },
  CHL: {
    id: 'countries.CHL',
    defaultMessage: 'Chile',
    description: 'ISO Country: CHL'
  },
  CHN: {
    id: 'countries.CHN',
    defaultMessage: 'China',
    description: 'ISO Country: CHN'
  },
  HKG: {
    id: 'countries.HKG',
    defaultMessage: '"China, Hong Kong Special Administrative Region"',
    description: 'ISO Country: HKG'
  },
  MAC: {
    id: 'countries.MAC',
    defaultMessage: '"China, Macao Special Administrative Region"',
    description: 'ISO Country: MAC'
  },
  CXR: {
    id: 'countries.CXR',
    defaultMessage: 'Christmas Island',
    description: 'ISO Country: CXR'
  },
  CCK: {
    id: 'countries.CCK',
    defaultMessage: 'Cocos (Keeling) Islands',
    description: 'ISO Country: CCK'
  },
  COL: {
    id: 'countries.COL',
    defaultMessage: 'Colombia',
    description: 'ISO Country: COL'
  },
  COM: {
    id: 'countries.COM',
    defaultMessage: 'Comoros',
    description: 'ISO Country: COM'
  },
  COG: {
    id: 'countries.COG',
    defaultMessage: 'Congo',
    description: 'ISO Country: COG'
  },
  COK: {
    id: 'countries.COK',
    defaultMessage: 'Cook Islands',
    description: 'ISO Country: COK'
  },
  CRI: {
    id: 'countries.CRI',
    defaultMessage: 'Costa Rica',
    description: 'ISO Country: CRI'
  },
  CIV: {
    id: 'countries.CIV',
    defaultMessage: "Côte d'Ivoire",
    description: 'ISO Country: CIV'
  },
  HRV: {
    id: 'countries.HRV',
    defaultMessage: 'Croatia',
    description: 'ISO Country: HRV'
  },
  CUB: {
    id: 'countries.CUB',
    defaultMessage: 'Cuba',
    description: 'ISO Country: CUB'
  },
  CUW: {
    id: 'countries.CUW',
    defaultMessage: 'Curaçao',
    description: 'ISO Country: CUW'
  },
  CYP: {
    id: 'countries.CYP',
    defaultMessage: 'Cyprus',
    description: 'ISO Country: CYP'
  },
  CZE: {
    id: 'countries.CZE',
    defaultMessage: 'Czechia',
    description: 'ISO Country: CZE'
  },
  PRK: {
    id: 'countries.PRK',
    defaultMessage: "Democratic People's Republic of Korea",
    description: 'PRK'
  },
  COD: {
    id: 'countries.COD',
    defaultMessage: 'Democratic Republic of the Congo',
    description: 'ISO Country: COD'
  },
  DNK: {
    id: 'countries.DNK',
    defaultMessage: 'Denmark',
    description: 'ISO Country: DNK'
  },
  DJI: {
    id: 'countries.DJI',
    defaultMessage: 'Djibouti',
    description: 'ISO Country: DJI'
  },
  DMA: {
    id: 'countries.DMA',
    defaultMessage: 'Dominica',
    description: 'ISO Country: DMA'
  },
  DOM: {
    id: 'countries.DOM',
    defaultMessage: 'Dominican Republic',
    description: 'ISO Country: DOM'
  },
  ECU: {
    id: 'countries.ECU',
    defaultMessage: 'Ecuador',
    description: 'ISO Country: ECU'
  },
  EGY: {
    id: 'countries.EGY',
    defaultMessage: 'Egypt',
    description: 'ISO Country: EGY'
  },
  SLV: {
    id: 'countries.SLV',
    defaultMessage: 'El Salvador',
    description: 'ISO Country: SLV'
  },
  GNQ: {
    id: 'countries.GNQ',
    defaultMessage: 'Equatorial Guinea',
    description: 'ISO Country: GNQ'
  },
  ERI: {
    id: 'countries.ERI',
    defaultMessage: 'Eritrea',
    description: 'ISO Country: ERI'
  },
  EST: {
    id: 'countries.EST',
    defaultMessage: 'Estonia',
    description: 'ISO Country: EST'
  },
  SWZ: {
    id: 'countries.SWZ',
    defaultMessage: 'Eswatini',
    description: 'ISO Country: SWZ'
  },
  ETH: {
    id: 'countries.ETH',
    defaultMessage: 'Ethiopia',
    description: 'ISO Country: ETH'
  },
  FLK: {
    id: 'countries.FLK',
    defaultMessage: 'Falkland Islands (Malvinas)',
    description: 'ISO Country: FLK'
  },
  FAR: {
    id: 'countries.FAR',
    defaultMessage: 'Farajaland',
    description: 'Fictional country for OpenCRSV demo'
  },
  FRO: {
    id: 'countries.FRO',
    defaultMessage: 'Faroe Islands',
    description: 'ISO Country: FRO'
  },
  FJI: {
    id: 'countries.FJI',
    defaultMessage: 'Fiji',
    description: 'ISO Country: FJI'
  },
  FIN: {
    id: 'countries.FIN',
    defaultMessage: 'Finland',
    description: 'ISO Country: FIN'
  },
  FRA: {
    id: 'countries.FRA',
    defaultMessage: 'France',
    description: 'ISO Country: FRA'
  },
  GUF: {
    id: 'countries.GUF',
    defaultMessage: 'French Guiana',
    description: 'ISO Country: GUF'
  },
  PYF: {
    id: 'countries.PYF',
    defaultMessage: 'French Polynesia',
    description: 'ISO Country: PYF'
  },
  ATF: {
    id: 'countries.ATF',
    defaultMessage: 'French Southern Territories',
    description: 'ISO Country: ATF'
  },
  GAB: {
    id: 'countries.GAB',
    defaultMessage: 'Gabon',
    description: 'ISO Country: GAB'
  },
  GMB: {
    id: 'countries.GMB',
    defaultMessage: 'Gambia',
    description: 'ISO Country: GMB'
  },
  GEO: {
    id: 'countries.GEO',
    defaultMessage: 'Georgia',
    description: 'ISO Country: GEO'
  },
  DEU: {
    id: 'countries.DEU',
    defaultMessage: 'Germany',
    description: 'ISO Country: DEU'
  },
  GHA: {
    id: 'countries.GHA',
    defaultMessage: 'Ghana',
    description: 'ISO Country: GHA'
  },
  GIB: {
    id: 'countries.GIB',
    defaultMessage: 'Gibraltar',
    description: 'ISO Country: GIB'
  },
  GRC: {
    id: 'countries.GRC',
    defaultMessage: 'Greece',
    description: 'ISO Country: GRC'
  },
  GRL: {
    id: 'countries.GRL',
    defaultMessage: 'Greenland',
    description: 'ISO Country: GRL'
  },
  GRD: {
    id: 'countries.GRD',
    defaultMessage: 'Grenada',
    description: 'ISO Country: GRD'
  },
  GLP: {
    id: 'countries.GLP',
    defaultMessage: 'Guadeloupe',
    description: 'ISO Country: GLP'
  },
  GUM: {
    id: 'countries.GUM',
    defaultMessage: 'Guam',
    description: 'ISO Country: GUM'
  },
  GTM: {
    id: 'countries.GTM',
    defaultMessage: 'Guatemala',
    description: 'ISO Country: GTM'
  },
  GGY: {
    id: 'countries.GGY',
    defaultMessage: 'Guernsey',
    description: 'ISO Country: GGY'
  },
  GIN: {
    id: 'countries.GIN',
    defaultMessage: 'Guinea',
    description: 'ISO Country: GIN'
  },
  GNB: {
    id: 'countries.GNB',
    defaultMessage: 'Guinea-Bissau',
    description: 'ISO Country: GNB'
  },
  GUY: {
    id: 'countries.GUY',
    defaultMessage: 'Guyana',
    description: 'ISO Country: GUY'
  },
  HTI: {
    id: 'countries.HTI',
    defaultMessage: 'Haiti',
    description: 'ISO Country: HTI'
  },
  HMD: {
    id: 'countries.HMD',
    defaultMessage: 'Heard Island and McDonald Islands',
    description: 'ISO Country: HMD'
  },
  VAT: {
    id: 'countries.VAT',
    defaultMessage: 'Holy See',
    description: 'ISO Country: VAT'
  },
  HND: {
    id: 'countries.HND',
    defaultMessage: 'Honduras',
    description: 'ISO Country: HND'
  },
  HUN: {
    id: 'countries.HUN',
    defaultMessage: 'Hungary',
    description: 'ISO Country: HUN'
  },
  ISL: {
    id: 'countries.ISL',
    defaultMessage: 'Iceland',
    description: 'ISO Country: ISL'
  },
  IND: {
    id: 'countries.IND',
    defaultMessage: 'India',
    description: 'ISO Country: IND'
  },
  IDN: {
    id: 'countries.IDN',
    defaultMessage: 'Indonesia',
    description: 'ISO Country: IDN'
  },
  IRN: {
    id: 'countries.IRN',
    defaultMessage: 'Iran (Islamic Republic of)',
    description: 'ISO Country: IRN'
  },
  IRQ: {
    id: 'countries.IRQ',
    defaultMessage: 'Iraq',
    description: 'ISO Country: IRQ'
  },
  IRL: {
    id: 'countries.IRL',
    defaultMessage: 'Ireland',
    description: 'ISO Country: IRL'
  },
  IMN: {
    id: 'countries.IMN',
    defaultMessage: 'Isle of Man',
    description: 'ISO Country: IMN'
  },
  ISR: {
    id: 'countries.ISR',
    defaultMessage: 'Israel',
    description: 'ISO Country: ISR'
  },
  ITA: {
    id: 'countries.ITA',
    defaultMessage: 'Italy',
    description: 'ISO Country: ITA'
  },
  JAM: {
    id: 'countries.JAM',
    defaultMessage: 'Jamaica',
    description: 'ISO Country: JAM'
  },
  JPN: {
    id: 'countries.JPN',
    defaultMessage: 'Japan',
    description: 'ISO Country: JPN'
  },
  JEY: {
    id: 'countries.JEY',
    defaultMessage: 'Jersey',
    description: 'ISO Country: JEY'
  },
  JOR: {
    id: 'countries.JOR',
    defaultMessage: 'Jordan',
    description: 'ISO Country: JOR'
  },
  KAZ: {
    id: 'countries.KAZ',
    defaultMessage: 'Kazakhstan',
    description: 'ISO Country: KAZ'
  },
  KEN: {
    id: 'countries.KEN',
    defaultMessage: 'Kenya',
    description: 'ISO Country: KEN'
  },
  KIR: {
    id: 'countries.KIR',
    defaultMessage: 'Kiribati',
    description: 'ISO Country: KIR'
  },
  KWT: {
    id: 'countries.KWT',
    defaultMessage: 'Kuwait',
    description: 'ISO Country: KWT'
  },
  KGZ: {
    id: 'countries.KGZ',
    defaultMessage: 'Kyrgyzstan',
    description: 'ISO Country: KGZ'
  },
  LAO: {
    id: 'countries.KGZ',
    defaultMessage: "Lao People's Democratic Republic Republic",
    description: 'ISO Country: LAO'
  },
  LVA: {
    id: 'countries.LVA',
    defaultMessage: 'Latvia',
    description: 'ISO Country: LVA'
  },
  LBN: {
    id: 'countries.LBN',
    defaultMessage: 'Lebanon',
    description: 'ISO Country: LBN'
  },
  LSO: {
    id: 'countries.LSO',
    defaultMessage: 'Lesotho',
    description: 'ISO Country: LSO'
  },
  LBR: {
    id: 'countries.LBR',
    defaultMessage: 'Liberia',
    description: 'ISO Country: LBR'
  },
  LBY: {
    id: 'countries.LBY',
    defaultMessage: 'Libya',
    description: 'ISO Country: LBY'
  },
  LIE: {
    id: 'countries.LIE',
    defaultMessage: 'Liechtenstein',
    description: 'ISO Country: LIE'
  },
  LTU: {
    id: 'countries.LTU',
    defaultMessage: 'Lithuania',
    description: 'ISO Country: LTU'
  },
  LUX: {
    id: 'countries.LUX',
    defaultMessage: 'Luxembourg',
    description: 'ISO Country: LUX'
  },
  MDG: {
    id: 'countries.MDG',
    defaultMessage: 'Madagascar',
    description: 'ISO Country: MDG'
  },
  MWI: {
    id: 'countries.MWI',
    defaultMessage: 'Malawi',
    description: 'ISO Country: MWI'
  },
  MYS: {
    id: 'countries.MYS',
    defaultMessage: 'Malaysia',
    description: 'ISO Country: MYS'
  },
  MDV: {
    id: 'countries.MDV',
    defaultMessage: 'Maldives',
    description: 'ISO Country: MDV'
  },
  MLI: {
    id: 'countries.MLI',
    defaultMessage: 'Mali',
    description: 'ISO Country: MLI'
  },
  MLT: {
    id: 'countries.MLT',
    defaultMessage: 'Malta',
    description: 'ISO Country: MLT'
  },
  MHL: {
    id: 'countries.MHL',
    defaultMessage: 'Marshall Islands',
    description: 'ISO Country: MHL'
  },
  MTQ: {
    id: 'countries.MTQ',
    defaultMessage: 'Martinique',
    description: 'ISO Country: MTQ'
  },
  MRT: {
    id: 'countries.MRT',
    defaultMessage: 'Mauritania',
    description: 'ISO Country: MRT'
  },
  MUS: {
    id: 'countries.MUS',
    defaultMessage: 'Mauritius',
    description: 'ISO Country: MUS'
  },
  MYT: {
    id: 'countries.MYT',
    defaultMessage: 'Mayotte',
    description: 'ISO Country: MYT'
  },
  MEX: {
    id: 'countries.MEX',
    defaultMessage: 'Mexico',
    description: 'ISO Country: MEX'
  },
  FSM: {
    id: 'countries.FSM',
    defaultMessage: 'Micronesia (Federated States of)',
    description: 'ISO Country: FSM'
  },

  MCO: {
    id: 'countries.MCO',
    defaultMessage: 'Monaco',
    description: 'ISO Country: MCO'
  },
  MNG: {
    id: 'countries.MNG',
    defaultMessage: 'Mongolia',
    description: 'ISO Country: MNG'
  },
  MNE: {
    id: 'countries.MNE',
    defaultMessage: 'Montenegro',
    description: 'ISO Country: MNE'
  },
  MSR: {
    id: 'countries.MSR',
    defaultMessage: 'Montserrat',
    description: 'ISO Country: MSR'
  },
  MAR: {
    id: 'countries.MAR',
    defaultMessage: 'Morocco',
    description: 'ISO Country: MAR'
  },
  MOZ: {
    id: 'countries.MOZ',
    defaultMessage: 'Mozambique',
    description: 'ISO Country: MOZ'
  },
  MMR: {
    id: 'countries.MMR',
    defaultMessage: 'Myanmar',
    description: 'ISO Country: MMR'
  },
  NAM: {
    id: 'countries.NAM',
    defaultMessage: 'Namibia',
    description: 'ISO Country: NAM'
  },
  NRU: {
    id: 'countries.NRU',
    defaultMessage: 'Nauru',
    description: 'ISO Country: NRU'
  },
  NPL: {
    id: 'countries.NPL',
    defaultMessage: 'Nepal',
    description: 'ISO Country: NPL'
  },
  NLD: {
    id: 'countries.NLD',
    defaultMessage: 'Netherlands',
    description: 'ISO Country: NLD'
  },
  NCL: {
    id: 'countries.NCL',
    defaultMessage: 'New Caledonia',
    description: 'ISO Country: NCL'
  },
  NZL: {
    id: 'countries.NZL',
    defaultMessage: 'New Zealand',
    description: 'ISO Country: NZL'
  },
  NIC: {
    id: 'countries.NIC',
    defaultMessage: 'Nicaragua',
    description: 'ISO Country: NIC'
  },
  NER: {
    id: 'countries.NER',
    defaultMessage: 'Niger',
    description: 'ISO Country: NER'
  },
  NGA: {
    id: 'countries.NGA',
    defaultMessage: 'Nigeria',
    description: 'ISO Country: NGA'
  },
  NIU: {
    id: 'countries.NIU',
    defaultMessage: 'Niue',
    description: 'ISO Country: NIU'
  },
  NFK: {
    id: 'countries.NFK',
    defaultMessage: 'Norfolk Island',
    description: 'ISO Country: NFK'
  },
  MNP: {
    id: 'countries.MNP',
    defaultMessage: 'Northern Mariana Islands',
    description: 'ISO Country: MNP'
  },
  NOR: {
    id: 'countries.NOR',
    defaultMessage: 'Norway',
    description: 'ISO Country: NOR'
  },
  OMN: {
    id: 'countries.OMN',
    defaultMessage: 'Oman',
    description: 'ISO Country: OMN'
  },
  PAK: {
    id: 'countries.PAK',
    defaultMessage: 'Pakistan',
    description: 'ISO Country: PAK'
  },
  PLW: {
    id: 'countries.PLW',
    defaultMessage: 'Palau',
    description: 'ISO Country: PLW'
  },
  PAN: {
    id: 'countries.PAN',
    defaultMessage: 'Panama',
    description: 'ISO Country: PAN'
  },
  PNG: {
    id: 'countries.PNG',
    defaultMessage: 'Papua New Guinea',
    description: 'ISO Country: PNG'
  },
  PRY: {
    id: 'countries.PRY',
    defaultMessage: 'Paraguay',
    description: 'ISO Country: PRY'
  },
  PER: {
    id: 'countries.PER',
    defaultMessage: 'Peru',
    description: 'ISO Country: PER'
  },
  PHL: {
    id: 'countries.PHL',
    defaultMessage: 'Philippines',
    description: 'ISO Country: PHL'
  },
  PCN: {
    id: 'countries.PCN',
    defaultMessage: 'Pitcairn',
    description: 'ISO Country: PCN'
  },
  POL: {
    id: 'countries.POL',
    defaultMessage: 'Poland',
    description: 'ISO Country: POL'
  },
  PRT: {
    id: 'countries.PRT',
    defaultMessage: 'Portugal',
    description: 'ISO Country: PRT'
  },
  PRI: {
    id: 'countries.PRI',
    defaultMessage: 'Puerto Rico',
    description: 'ISO Country: PRI'
  },
  QAT: {
    id: 'countries.QAT',
    defaultMessage: 'Qatar',
    description: 'ISO Country: QAT'
  },
  KOR: {
    id: 'countries.KOR',
    defaultMessage: 'Republic of Korea',
    description: 'ISO Country: KOR'
  },
  MDA: {
    id: 'countries.MDA',
    defaultMessage: 'Republic of Moldova',
    description: 'ISO Country: MDA'
  },
  REU: {
    id: 'countries.REU',
    defaultMessage: 'Réunion',
    description: 'ISO Country: REU'
  },
  ROU: {
    id: 'countries.ROU',
    defaultMessage: 'Romania',
    description: 'ISO Country: ROU'
  },
  RUS: {
    id: 'countries.RUS',
    defaultMessage: 'Russian Federation',
    description: 'ISO Country: RUS'
  },
  RWA: {
    id: 'countries.RWA',
    defaultMessage: 'Rwanda',
    description: 'ISO Country: RWA'
  },
  BLM: {
    id: 'countries.BLM',
    defaultMessage: 'Saint Barthélemy',
    description: 'ISO Country: BLM'
  },
  SHN: {
    id: 'countries.SHN',
    defaultMessage: 'Saint Helena',
    description: 'ISO Country: SHN'
  },
  KNA: {
    id: 'countries.KNA',
    defaultMessage: 'Saint Kitts and Nevis',
    description: 'ISO Country: KNA'
  },
  LCA: {
    id: 'countries.LCA',
    defaultMessage: 'Saint Lucia',
    description: 'ISO Country: LCA'
  },
  MAF: {
    id: 'countries.MAF',
    defaultMessage: 'Saint Martin (French Part)',
    description: 'ISO Country: MAF'
  },
  SPM: {
    id: 'countries.SPM',
    defaultMessage: 'Saint Pierre and Miquelon',
    description: 'ISO Country: SPM'
  },
  VCT: {
    id: 'countries.VCT',
    defaultMessage: 'Saint Vincent and the Grenadines',
    description: 'ISO Country: VCT'
  },
  WSM: {
    id: 'countries.WSM',
    defaultMessage: 'Samoa',
    description: 'ISO Country: WSM'
  },
  SMR: {
    id: 'countries.SMR',
    defaultMessage: 'San Marino',
    description: 'ISO Country: SMR'
  },
  STP: {
    id: 'countries.STP',
    defaultMessage: 'Sao Tome and Principe',
    description: 'ISO Country: STP'
  },
  SAU: {
    id: 'countries.SAU',
    defaultMessage: 'Saudi Arabia',
    description: 'ISO Country: SAU'
  },
  SEN: {
    id: 'countries.SEN',
    defaultMessage: 'Senegal',
    description: 'ISO Country: SEN'
  },
  SRB: {
    id: 'countries.SRB',
    defaultMessage: 'Serbia',
    description: 'ISO Country: SRB'
  },
  SYC: {
    id: 'countries.SYC',
    defaultMessage: 'Seychelles',
    description: 'ISO Country: SYC'
  },
  SLE: {
    id: 'countries.SLE',
    defaultMessage: 'Sierra Leone',
    description: 'ISO Country: SLE'
  },
  SGP: {
    id: 'countries.SGP',
    defaultMessage: 'Singapore',
    description: 'ISO Country: SGP'
  },
  SXM: {
    id: 'countries.SXM',
    defaultMessage: 'Sint Maarten (Dutch part)',
    description: 'ISO Country: SXM'
  },
  SVK: {
    id: 'countries.SVK',
    defaultMessage: 'Slovakia',
    description: 'ISO Country: SVK'
  },
  SVN: {
    id: 'countries.SVN',
    defaultMessage: 'Slovenia',
    description: 'ISO Country: SVN'
  },
  SLB: {
    id: 'countries.SLB',
    defaultMessage: 'Solomon Islands',
    description: 'ISO Country: SLB'
  },
  SOM: {
    id: 'countries.SOM',
    defaultMessage: 'Somalia',
    description: 'ISO Country: SOM'
  },
  ZAF: {
    id: 'countries.ZAF',
    defaultMessage: 'South Africa',
    description: 'ISO Country: ZAF'
  },
  SGS: {
    id: 'countries.SGS',
    defaultMessage: 'South Georgia and the South Sandwich Islands',
    description: 'ISO Country: SGS'
  },
  SSD: {
    id: 'countries.SSD',
    defaultMessage: 'South Sudan',
    description: 'ISO Country: SSD'
  },
  ESP: {
    id: 'countries.ESP',
    defaultMessage: 'Spain',
    description: 'ISO Country: ESP'
  },
  LKA: {
    id: 'countries.LKA',
    defaultMessage: 'Sri Lanka',
    description: 'ISO Country: LKA'
  },
  PSE: {
    id: 'countries.PSE',
    defaultMessage: 'State of Palestine',
    description: 'ISO Country: PSE'
  },
  SDN: {
    id: 'countries.SDN',
    defaultMessage: 'Sudan',
    description: 'ISO Country: SDN'
  },
  SUR: {
    id: 'countries.SUR',
    defaultMessage: 'Suriname',
    description: 'ISO Country: SUR'
  },
  SJM: {
    id: 'countries.SJM',
    defaultMessage: 'Svalbard and Jan Mayen Islands',
    description: 'ISO Country: SJM'
  },
  SWE: {
    id: 'countries.SWE',
    defaultMessage: 'Sweden',
    description: 'ISO Country: SWE'
  },
  CHE: {
    id: 'countries.CHE',
    defaultMessage: 'Switzerland',
    description: 'ISO Country: CHE'
  },
  SYR: {
    id: 'countries.SYR',
    defaultMessage: 'Syrian Arab Republic',
    description: 'ISO Country: SYR'
  },
  TJK: {
    id: 'countries.TJK',
    defaultMessage: 'Tajikistan',
    description: 'ISO Country: TJK'
  },
  THA: {
    id: 'countries.THA',
    defaultMessage: 'Thailand',
    description: 'ISO Country: THA'
  },
  MKD: {
    id: 'countries.MKD',
    defaultMessage: 'The former Yugoslav Republic of Macedonia',
    description: 'ISO Country: MKD'
  },
  TLS: {
    id: 'countries.TLS',
    defaultMessage: 'Timor-Leste',
    description: 'ISO Country: TLS'
  },
  TGO: {
    id: 'countries.TGO',
    defaultMessage: 'Togo',
    description: 'ISO Country: TGO'
  },
  TKL: {
    id: 'countries.TKL',
    defaultMessage: 'Tokelau',
    description: 'ISO Country: TKL'
  },
  TON: {
    id: 'countries.TON',
    defaultMessage: 'Tonga',
    description: 'ISO Country: TON'
  },
  TTO: {
    id: 'countries.TTO',
    defaultMessage: 'Trinidad and Tobago',
    description: 'ISO Country: TTO'
  },
  TUN: {
    id: 'countries.TUN',
    defaultMessage: 'Tunisia',
    description: 'ISO Country: TUN'
  },
  TUR: {
    id: 'countries.TUR',
    defaultMessage: 'Turkey',
    description: 'ISO Country: TUR'
  },
  TKM: {
    id: 'countries.TKM',
    defaultMessage: 'Turkmenistan',
    description: 'ISO Country: TKM'
  },
  TCA: {
    id: 'countries.TCA',
    defaultMessage: 'Turks and Caicos Islands',
    description: 'ISO Country: TCA'
  },
  TUV: {
    id: 'countries.TUV',
    defaultMessage: 'Tuvalu',
    description: 'ISO Country: TUV'
  },
  UGA: {
    id: 'countries.UGA',
    defaultMessage: 'Uganda',
    description: 'ISO Country: UGA'
  },
  UKR: {
    id: 'countries.UKR',
    defaultMessage: 'Ukraine',
    description: 'ISO Country: UKR'
  },
  ARE: {
    id: 'countries.ARE',
    defaultMessage: 'United Arab Emirates',
    description: 'ISO Country: ARE'
  },
  GBR: {
    id: 'countries.GBR',
    defaultMessage: 'United Kingdom of Great Britain and Northern Ireland',
    description: 'ISO Country: GBR'
  },
  TZA: {
    id: 'countries.TZA',
    defaultMessage: 'United Republic of Tanzania',
    description: 'ISO Country: TZA'
  },
  UMI: {
    id: 'countries.UMI',
    defaultMessage: 'United States Minor Outlying Islands',
    description: 'ISO Country: UMI'
  },
  USA: {
    id: 'countries.USA',
    defaultMessage: 'United States of America',
    description: 'ISO Country: USA'
  },
  VIR: {
    id: 'countries.VIR',
    defaultMessage: 'United States Virgin Islands',
    description: 'ISO Country: VIR'
  },
  URY: {
    id: 'countries.URY',
    defaultMessage: 'Uruguay',
    description: 'ISO Country: URY'
  },
  UZB: {
    id: 'countries.UZB',
    defaultMessage: 'Uzbekistan',
    description: 'ISO Country: UZB'
  },
  VUT: {
    id: 'countries.VUT',
    defaultMessage: 'Vanuatu',
    description: 'ISO Country: VUT'
  },
  VEN: {
    id: 'countries.VEN',
    defaultMessage: 'Venezuela (Bolivarian Republic of)',
    description: 'ISO Country: VEN'
  },
  VNM: {
    id: 'countries.VNM',
    defaultMessage: 'Viet Nam',
    description: 'ISO Country: VNM'
  },
  WLF: {
    id: 'countries.WLF',
    defaultMessage: 'Wallis and Futuna Islands',
    description: 'ISO Country: WLF'
  },
  ESH: {
    id: 'countries.ESH',
    defaultMessage: 'Western Sahara',
    description: 'ISO Country: ESH'
  },
  YEM: {
    id: 'countries.YEM',
    defaultMessage: 'Yemen',
    description: 'ISO Country: YEM'
  },
  ZMB: {
    id: 'countries.ZMB',
    defaultMessage: 'Zambia',
    description: 'ISO Country: ZMB'
  },
  ZWE: {
    id: 'countries.ZWE',
    defaultMessage: 'Zimbabwe',
    description: 'ISO Country ZWE'
  }
}

export const countryMessages: Record<
  string | number | symbol,
  MessageDescriptor
> = defineMessages(countryMessagesToDefine)
