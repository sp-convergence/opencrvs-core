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
import { checkAuth } from '@client/profile/profileActions'
import { AppStore, createStore } from '@client/store'
import {
  createTestComponent,
  mockUserResponse,
  resizeWindow
} from '@client/tests/util'
import { waitForElement } from '@client/tests/wait-for-element'
import { GridTable } from '@opencrvs/components/lib/interface'
import { readFileSync } from 'fs'
import * as jwt from 'jsonwebtoken'
import { merge } from 'lodash'
import * as React from 'react'
import { SentForReview } from './SentForReview'
import {
  GQLBirthEventSearchSet,
  GQLDeathEventSearchSet
} from '@opencrvs/gateway/src/graphql/schema'
import { formattedDuration } from '@client/utils/date-formatting'
import { History } from 'history'
import { vi, Mock } from 'vitest'

const validateScopeToken = jwt.sign(
  { scope: ['validate'] },
  readFileSync('../auth/test/cert.key'),
  {
    algorithm: 'RS256',
    issuer: 'opencrvs:auth-service',
    audience: 'opencrvs:gateway-user'
  }
)

const nameObj = {
  data: {
    getUser: {
      name: [
        {
          use: 'en',
          firstNames: 'Mohammad',
          familyName: 'Ashraful',
          __typename: 'HumanName'
        },
        { use: 'bn', firstNames: '', familyName: '', __typename: 'HumanName' }
      ],
      role: 'DISTRICT_REGISTRAR'
    }
  }
}

const mockUserData = {
  id: 'e302f7c5-ad87-4117-91c1-35eaf2ea7be8',
  type: 'Birth',
  registration: {
    status: 'DECLARED',
    contactNumber: '01622688231',
    trackingId: 'BW0UTHR',
    registrationNumber: null,
    registeredLocationId: '308c35b4-04f8-4664-83f5-9790e790cde1',
    duplicates: null,
    createdAt: '2018-05-23T14:44:58+02:00',
    modifiedAt: '2018-05-23T14:44:58+02:00'
  },
  dateOfBirth: '2010-10-10',
  childName: [
    {
      firstNames: 'Iliyas',
      familyName: 'Khan',
      use: 'en'
    },
    {
      firstNames: 'ইলিয়াস',
      familyName: 'খান',
      use: 'bn'
    }
  ],
  // TODO: When fragmentMatching work is completed, remove unnecessary result objects
  // PR: https://github.com/opencrvs/opencrvs-core/pull/836/commits/6302fa8f015fe313cbce6197980f1300bf4eba32
  child: {
    id: 'FAKE_ID',
    name: [
      {
        firstNames: 'Iliyas',
        familyName: 'Khan',
        use: 'en'
      },
      {
        firstNames: 'ইলিয়াস',
        familyName: 'খান',
        use: 'bn'
      }
    ],
    birthDate: '2010-10-10'
  },
  deceased: {
    name: [
      {
        use: '',
        firstNames: '',
        familyName: ''
      }
    ],
    deceased: {
      deathDate: ''
    }
  },
  informant: {
    individual: {
      telecom: [
        {
          system: '',
          use: '',
          value: ''
        }
      ]
    }
  },
  dateOfDeath: null,
  deceasedName: null,
  createdAt: '2018-05-23T14:44:58+02:00'
}
const userData: any = []
for (let i = 0; i < 14; i++) {
  userData.push(mockUserData)
}
merge(mockUserResponse, nameObj)

const getItem = window.localStorage.getItem as Mock

describe('RegistrationHome sent for approval tab related tests', () => {
  let store: AppStore
  let history: History
  beforeEach(async () => {
    ;({ store, history } = createStore())
    getItem.mockReturnValue(validateScopeToken)
    await store.dispatch(checkAuth())
  })

  it('renders all items returned from graphql query in sent for approval', async () => {
    const TIME_STAMP = '1544188309380'
    Date.now = vi.fn(() => 1554055200000)

    const sentForApprovalDate = '2019-10-20T11:03:20.660Z'
    const testComponent = await createTestComponent(
      <SentForReview
        queryData={{
          data: {
            totalItems: 2,
            results: [
              {
                id: 'e302f7c5-ad87-4117-91c1-35eaf2ea7be8',
                type: 'Birth',
                registration: {
                  status: 'VALIDATED',
                  contactNumber: '01622688231',
                  trackingId: 'BW0UTHR',
                  registrationNumber: undefined,
                  eventLocationId: undefined,
                  registeredLocationId: '308c35b4-04f8-4664-83f5-9790e790cde1',
                  duplicates: [null],
                  createdAt: TIME_STAMP,
                  modifiedAt: TIME_STAMP
                },
                operationHistories: [
                  {
                    operationType: 'VALIDATED',
                    operatedOn: sentForApprovalDate,
                    operatorRole: 'LOCAL_REGISTRAR',
                    operatorName: [
                      {
                        firstNames: 'Mohammad',
                        familyName: 'Ashraful',
                        use: 'en'
                      },
                      {
                        firstNames: '',
                        familyName: '',
                        use: 'bn'
                      }
                    ],
                    operatorOfficeName: 'Alokbali Union Parishad',
                    operatorOfficeAlias: ['আলোকবালী  ইউনিয়ন পরিষদ']
                  }
                ],
                dateOfBirth: '2010-10-10',
                childName: [
                  {
                    firstNames: 'Iliyas',
                    familyName: 'Khan',
                    use: 'en'
                  },
                  {
                    firstNames: 'ইলিয়াস',
                    familyName: 'খান',
                    use: 'bn'
                  }
                ]
              } as GQLBirthEventSearchSet,
              {
                id: 'bc09200d-0160-43b4-9e2b-5b9e90424e95',
                type: 'Death',
                registration: {
                  status: 'VALIDATED',
                  trackingId: 'DW0UTHR',
                  registrationNumber: undefined,
                  contactNumber: undefined,
                  eventLocationId: undefined,
                  duplicates: ['308c35b4-04f8-4664-83f5-9790e790cd33'],
                  registeredLocationId: '308c35b4-04f8-4664-83f5-9790e790cde1',
                  createdAt: TIME_STAMP,
                  modifiedAt: undefined
                },
                dateOfDeath: '2007-01-01',
                deceasedName: [
                  {
                    firstNames: 'Iliyas',
                    familyName: 'Khan',
                    use: 'en'
                  },
                  {
                    firstNames: 'ইলিয়াস',
                    familyName: 'খান',
                    use: 'bn'
                  }
                ]
              } as GQLDeathEventSearchSet
            ]
          }
        }}
        paginationId={1}
        pageSize={10}
        onPageChange={() => {}}
        loading={false}
        error={false}
      />,
      { store, history }
    )

    testComponent.update()
    const data = testComponent.find(GridTable).prop('content')
    const EXPECTED_DATE_OF_DECLARATION = formattedDuration(
      new Date(sentForApprovalDate)
    )

    expect(data.length).toBe(2)
    expect(data[0].id).toBe('e302f7c5-ad87-4117-91c1-35eaf2ea7be8')
    expect(data[0].eventTimeElapsed).toBe('8 years ago')
    expect(data[0].sentForApproval).toBe(EXPECTED_DATE_OF_DECLARATION)
    expect(data[0].name).toBe('iliyas khan')
    expect(data[0].trackingId).toBe('BW0UTHR')
    expect(data[0].event).toBe('Birth')
    expect(data[0].actions).toBeDefined()
  })

  it('returns an empty array incase of invalid graphql query response', async () => {
    Date.now = vi.fn(() => 1554055200000)

    const testComponent = await createTestComponent(
      <SentForReview
        queryData={{
          data: {
            totalItems: 2,
            results: []
          }
        }}
        paginationId={1}
        pageSize={10}
        onPageChange={() => {}}
        loading={false}
        error={false}
      />,
      { store, history }
    )

    const data = (await waitForElement(testComponent, GridTable)).prop(
      'content'
    )
    expect(data.length).toBe(0)
  })

  it('should show pagination if items more than 10 in Approval Tab', async () => {
    Date.now = vi.fn(() => 1554055200000)

    const testComponent = await createTestComponent(
      <SentForReview
        queryData={{
          data: {
            totalItems: 14,
            results: []
          }
        }}
        paginationId={1}
        pageSize={10}
        onPageChange={() => {}}
        loading={false}
        error={false}
      />,
      { store, history }
    )

    expect(
      testComponent.find('#pagination_container').hostNodes()
    ).toHaveLength(1)

    testComponent
      .find('#pagination button')
      .last()
      .hostNodes()
      .simulate('click')
  })

  it('should show pagination and page number as per need ', async () => {
    Date.now = vi.fn(() => 1554055200000)

    const testComponent = await createTestComponent(
      <SentForReview
        queryData={{
          data: {
            totalItems: 24,
            results: []
          }
        }}
        paginationId={1}
        pageSize={10}
        onPageChange={() => {}}
        loading={false}
        error={false}
      />,
      { store, history }
    )

    expect(
      testComponent.find('#pagination_container').hostNodes()
    ).toHaveLength(1)
    expect(testComponent.exists('#page-number-2')).toBeTruthy()
  })

  it('redirect to recordAudit page if item is clicked on desktop view ', async () => {
    Date.now = vi.fn(() => 1554055200000)

    const testComponent = await createTestComponent(
      <SentForReview
        queryData={{
          data: {
            totalItems: 2,
            results: [
              {
                id: 'e302f7c5-ad87-4117-91c1-35eaf2ea7be8',
                type: 'Birth',
                registration: {
                  status: 'VALIDATED',
                  contactNumber: '01622688231',
                  trackingId: 'BW0UTHR',
                  eventLocationId: undefined,
                  registrationNumber: undefined,
                  registeredLocationId: '308c35b4-04f8-4664-83f5-9790e790cde1',
                  duplicates: [null],
                  createdAt: '2018-05-23T14:44:58+02:00',
                  modifiedAt: '2018-05-23T14:44:58+02:00'
                },
                dateOfBirth: '2010-10-10',
                childName: [
                  {
                    firstNames: 'Iliyas',
                    familyName: 'Khan',
                    use: 'en'
                  },
                  {
                    firstNames: 'ইলিয়াস',
                    familyName: 'খান',
                    use: 'bn'
                  }
                ]
              } as GQLBirthEventSearchSet,
              {
                id: 'bc09200d-0160-43b4-9e2b-5b9e90424e95',
                type: 'Death',
                registration: {
                  status: 'VALIDATED',
                  trackingId: 'DW0UTHR',
                  registrationNumber: undefined,
                  eventLocationId: undefined,
                  contactNumber: undefined,
                  duplicates: ['308c35b4-04f8-4664-83f5-9790e790cd33'],
                  registeredLocationId: '308c35b4-04f8-4664-83f5-9790e790cde1',
                  createdAt: '2007-01-01',
                  modifiedAt: '2007-01-01'
                },
                operationHistories: [
                  {
                    operationType: 'VALIDATED',
                    operatedOn: '2019-12-12T15:23:21.280Z',
                    operatorRole: 'REGISTRATION_AGENT',
                    operatorName: [
                      {
                        firstNames: 'Tamim',
                        familyName: 'Iqbal',
                        use: 'en'
                      },
                      {
                        firstNames: '',
                        familyName: null,
                        use: 'bn'
                      }
                    ],
                    operatorOfficeName: 'Alokbali Union Parishad',
                    operatorOfficeAlias: ['আলোকবালী  ইউনিয়ন পরিষদ']
                  }
                ],
                dateOfDeath: '2007-01-01',
                deceasedName: [
                  {
                    firstNames: 'Iliyas',
                    familyName: 'Khan',
                    use: 'en'
                  },
                  {
                    firstNames: 'ইলিয়াস',
                    familyName: 'খান',
                    use: 'bn'
                  }
                ]
              } as GQLDeathEventSearchSet
            ]
          }
        }}
        paginationId={1}
        pageSize={10}
        onPageChange={() => {}}
        loading={false}
        error={false}
      />,
      { store, history }
    )

    testComponent.update()
    const element = await waitForElement(testComponent, '#name_0')
    element.hostNodes().simulate('click')

    await new Promise((resolve) => {
      setTimeout(resolve, 100)
    })
    testComponent.update()

    expect(window.location.href).toContain(
      '/record-audit/approvalTab/e302f7c5-ad87-4117-91c1-35eaf2ea7be8'
    )
  })
})

describe('Tablet tests', () => {
  const { store, history } = createStore()

  beforeAll(async () => {
    getItem.mockReturnValue(validateScopeToken)
    await store.dispatch(checkAuth())
    resizeWindow(800, 1280)
  })

  afterEach(() => {
    resizeWindow(1024, 768)
  })

  it('redirects to recordAudit page if item is clicked', async () => {
    vi.clearAllMocks()
    const TIME_STAMP = '1544188309380'
    Date.now = vi.fn(() => 1554055200000)

    const testComponent = await createTestComponent(
      <SentForReview
        queryData={{
          data: {
            totalItems: 2,
            results: [
              {
                id: 'e302f7c5-ad87-4117-91c1-35eaf2ea7be8',
                type: 'Birth',
                registration: {
                  status: 'VALIDATED',
                  contactNumber: '01622688231',
                  trackingId: 'BW0UTHR',
                  eventLocationId: undefined,
                  registrationNumber: undefined,
                  registeredLocationId: '308c35b4-04f8-4664-83f5-9790e790cde1',
                  duplicates: [null],
                  createdAt: TIME_STAMP,
                  modifiedAt: TIME_STAMP
                },
                dateOfBirth: '2010-10-10',
                childName: [
                  {
                    firstNames: 'Iliyas',
                    familyName: 'Khan',
                    use: 'en'
                  },
                  {
                    firstNames: 'ইলিয়াস',
                    familyName: 'খান',
                    use: 'bn'
                  }
                ]
              } as GQLBirthEventSearchSet,
              {
                id: 'bc09200d-0160-43b4-9e2b-5b9e90424e95',
                type: 'Death',
                registration: {
                  status: 'VALIDATED',
                  trackingId: 'DW0UTHR',
                  registrationNumber: undefined,
                  eventLocationId: undefined,
                  contactNumber: undefined,
                  duplicates: ['308c35b4-04f8-4664-83f5-9790e790cd33'],
                  registeredLocationId: '308c35b4-04f8-4664-83f5-9790e790cde1',
                  createdAt: TIME_STAMP,
                  modifiedAt: undefined
                },
                dateOfDeath: '2007-01-01',
                deceasedName: [
                  {
                    firstNames: 'Iliyas',
                    familyName: 'Khan',
                    use: 'en'
                  },
                  {
                    firstNames: 'ইলিয়াস',
                    familyName: 'খান',
                    use: 'bn'
                  }
                ]
              } as GQLDeathEventSearchSet
            ]
          }
        }}
        paginationId={1}
        pageSize={10}
        onPageChange={() => {}}
        loading={false}
        error={false}
      />,
      { store, history }
    )

    testComponent.update()
    const element = await waitForElement(testComponent, '#name_0')
    element.hostNodes().simulate('click')

    await new Promise((resolve) => {
      setTimeout(resolve, 100)
    })
    testComponent.update()

    expect(window.location.href).toContain(
      '/record-audit/approvalTab/e302f7c5-ad87-4117-91c1-35eaf2ea7be8'
    )
  })
})
