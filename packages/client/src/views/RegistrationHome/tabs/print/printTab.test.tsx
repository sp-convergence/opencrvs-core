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
import {
  createTestComponent,
  mockUserResponse,
  resizeWindow
} from '@client/tests/util'
import { queries } from '@client/profile/queries'
import { merge } from 'lodash'
import { storage } from '@client/storage'
import { createStore } from '@client/store'
import {
  RegistrationHome,
  EVENT_STATUS
} from '@client/views/RegistrationHome/RegistrationHome'
import { GridTable } from '@opencrvs/components/lib/interface'
import {
  FETCH_REGISTRATION_BY_COMPOSITION,
  REGISTRATION_HOME_QUERY
} from '@client/views/RegistrationHome/queries'
import { checkAuth } from '@client/profile/profileActions'
import moment from 'moment'
import { waitForElement } from '@client/tests/wait-for-element'
import { ReactWrapper } from 'enzyme'
import {
  makeApplicationReadyToDownload,
  DOWNLOAD_STATUS,
  storeApplication
} from '@client/applications'
import { Action, Event } from '@client/forms'
import { Store } from 'redux'
import { GET_DEATH_REGISTRATION_FOR_CERTIFICATION } from '@client/views/DataProvider/death/queries'

const registerScopeToken =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJyZWdpc3RlciIsImNlcnRpZnkiLCJkZW1vIl0sImlhdCI6MTU0MjY4ODc3MCwiZXhwIjoxNTQzMjkzNTcwLCJhdWQiOlsib3BlbmNydnM6YXV0aC11c2VyIiwib3BlbmNydnM6dXNlci1tZ250LXVzZXIiLCJvcGVuY3J2czpoZWFydGgtdXNlciIsIm9wZW5jcnZzOmdhdGV3YXktdXNlciIsIm9wZW5jcnZzOm5vdGlmaWNhdGlvbi11c2VyIiwib3BlbmNydnM6d29ya2Zsb3ctdXNlciJdLCJpc3MiOiJvcGVuY3J2czphdXRoLXNlcnZpY2UiLCJzdWIiOiI1YmVhYWY2MDg0ZmRjNDc5MTA3ZjI5OGMifQ.ElQd99Lu7WFX3L_0RecU_Q7-WZClztdNpepo7deNHqzro-Cog4WLN7RW3ZS5PuQtMaiOq1tCb-Fm3h7t4l4KDJgvC11OyT7jD6R2s2OleoRVm3Mcw5LPYuUVHt64lR_moex0x_bCqS72iZmjrjS-fNlnWK5zHfYAjF2PWKceMTGk6wnI9N49f6VwwkinJcwJi6ylsjVkylNbutQZO0qTc7HRP-cBfAzNcKD37FqTRNpVSvHdzQSNcs7oiv3kInDN5aNa2536XSd3H-RiKR9hm9eID9bSIJgFIGzkWRd5jnoYxT70G0t03_mTVnDnqPXDtyI-lmerx24Ost0rQLUNIg'
const getItem = window.localStorage.getItem as jest.Mock

const mockFetchUserDetails = jest.fn()

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
  id: '956281c9-1f47-4c26-948a-970dd23c4094',
  type: 'Birth',
  registration: {
    status: 'REGISTERED',
    contactNumber: '01622688231',
    trackingId: 'BW0UTHR',
    registrationNumber: '20190203323443BW0UTHR',
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
  // PR: https://github.com/jembi/OpenCRVS/pull/836/commits/6302fa8f015fe313cbce6197980f1300bf4eba32
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
mockFetchUserDetails.mockReturnValue(mockUserResponse)
queries.fetchUserDetails = mockFetchUserDetails

const mockPrintTabData = {
  totalItems: 2,
  results: [
    {
      id: '956281c9-1f47-4c26-948a-970dd23c4094',
      type: 'Death',
      registration: {
        status: 'REGISTERED',
        contactNumber: null,
        trackingId: 'DG6PECX',
        registrationNumber: '20196816020000113',
        registeredLocationId: 'd8cfd240-4b5a-4557-9df7-b1591a11d843',
        duplicates: null,
        createdAt: '1574696143372',
        modifiedAt: null
      },
      dateOfBirth: '1988-06-16',
      childName: null,
      dateOfDeath: '2019-01-18',
      deceasedName: [
        {
          use: 'bn',
          firstNames: 'ক ম আব্দুল্লাহ আল আমিন ',
          familyName: 'খান'
        },
        {
          use: 'en',
          firstNames: 'K M Abdullah al amin',
          familyName: 'Khan'
        }
      ]
    },
    {
      id: 'bc09200d-0160-43b4-9e2b-5b9e90424e95',
      type: 'Death',
      registration: {
        status: 'REGISTERED',
        trackingId: 'DW0UTHR',
        registrationNumber: '2019333494B8I0NEB9',
        contactNumber: '01622688231',
        duplicates: ['308c35b4-04f8-4664-83f5-9790e790cd33'],
        registeredLocationId: '308c35b4-04f8-4664-83f5-9790e790cde1',
        createdAt: '2007-01-01',
        modifiedAt: '2007-01-01'
      },
      dateOfBirth: null,
      childName: null,
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
    }
  ]
}

storage.getItem = jest.fn()
storage.setItem = jest.fn()

describe('RegistrarHome ready to print tab related tests', () => {
  const { store, history } = createStore()

  beforeAll(async () => {
    getItem.mockReturnValue(registerScopeToken)
    await store.dispatch(checkAuth({ '?token': registerScopeToken }))
  })

  it('check ready to print applications count', async () => {
    const graphqlMock = [
      {
        request: {
          query: REGISTRATION_HOME_QUERY,
          variables: {
            locationIds: ['2a83cf14-b959-47f4-8097-f75a75d1867f'],
            count: 10,
            reviewStatuses: [EVENT_STATUS.DECLARED, EVENT_STATUS.VALIDATED],
            inProgressSkip: 0,
            reviewSkip: 0,
            rejectSkip: 0,
            approvalSkip: 0,
            printSkip: 0
          }
        },
        result: {
          data: {
            inProgressTab: { totalItems: 0, results: [] },
            reviewTab: { totalItems: 0, results: [] },
            rejectTab: { totalItems: 0, results: [] },
            approvalTab: { totalItems: 0, results: [] },
            printTab: { totalItems: 7, results: [] }
          }
        }
      }
    ]

    const testComponent = await createTestComponent(
      // @ts-ignore
      <RegistrationHome
        match={{
          params: {
            tabId: 'print'
          },
          isExact: true,
          path: '',
          url: ''
        }}
      />,
      store,
      graphqlMock
    )

    const element = await waitForElement(testComponent.component, '#tab_print')
    expect(element.hostNodes().text()).toContain('Ready to print (7)')
  })

  it('renders all items returned from graphql query in ready for print', async () => {
    const TIME_STAMP = '1544188309380'
    Date.now = jest.fn(() => 1554055200000)
    const graphqlMock = [
      {
        request: {
          query: REGISTRATION_HOME_QUERY,
          variables: {
            locationIds: ['2a83cf14-b959-47f4-8097-f75a75d1867f'],
            count: 10,
            reviewStatuses: [EVENT_STATUS.DECLARED, EVENT_STATUS.VALIDATED],
            inProgressSkip: 0,
            reviewSkip: 0,
            rejectSkip: 0,
            approvalSkip: 0,
            printSkip: 0
          }
        },
        result: {
          data: {
            inProgressTab: { totalItems: 0, results: [] },
            reviewTab: { totalItems: 0, results: [] },
            rejectTab: { totalItems: 0, results: [] },
            approvalTab: { totalItems: 0, results: [] },
            printTab: {
              totalItems: 2,
              results: [
                {
                  id: '956281c9-1f47-4c26-948a-970dd23c4094',
                  type: 'Birth',
                  registration: {
                    status: 'REGISTERED',
                    contactNumber: '01622688231',
                    trackingId: 'BW0UTHR',
                    registrationNumber: '2019333494BBONT7U7',
                    registeredLocationId:
                      '308c35b4-04f8-4664-83f5-9790e790cde1',
                    duplicates: null,
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
                  ],
                  dateOfDeath: null,
                  deceasedName: null
                },
                {
                  id: 'bc09200d-0160-43b4-9e2b-5b9e90424e95',
                  type: 'Death',
                  registration: {
                    status: 'REGISTERED',
                    trackingId: 'DW0UTHR',
                    registrationNumber: '2019333494B8I0NEB9',
                    contactNumber: '01622688231',
                    duplicates: ['308c35b4-04f8-4664-83f5-9790e790cd33'],
                    registeredLocationId:
                      '308c35b4-04f8-4664-83f5-9790e790cde1',
                    createdAt: TIME_STAMP,
                    modifiedAt: null
                  },
                  dateOfBirth: null,
                  childName: null,
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
                }
              ]
            }
          }
        }
      }
    ]

    const testComponent = await createTestComponent(
      // @ts-ignore
      <RegistrationHome match={{ params: { tabId: 'print' } }} />,
      store,
      graphqlMock
    )

    getItem.mockReturnValue(registerScopeToken)
    await testComponent.store.dispatch(
      checkAuth({ '?token': registerScopeToken })
    )

    const element = await waitForElement(testComponent.component, GridTable)
    const data = element.prop('content')
    const EXPECTED_DATE_OF_APPLICATION = moment(
      moment(TIME_STAMP, 'x').format('YYYY-MM-DD HH:mm:ss'),
      'YYYY-MM-DD HH:mm:ss'
    ).fromNow()

    expect(data.length).toBe(2)
    expect(data[0].id).toBe('956281c9-1f47-4c26-948a-970dd23c4094')
    expect(data[0].dateOfRegistration).toBe(EXPECTED_DATE_OF_APPLICATION)
    expect(data[0].trackingId).toBe('BW0UTHR')
    expect(data[0].event).toBe('Birth')
    expect(data[0].actions).toBeDefined()
  })

  it('returns an empty array incase of invalid graphql query response', async () => {
    Date.now = jest.fn(() => 1554055200000)
    const graphqlMock = [
      {
        request: {
          query: REGISTRATION_HOME_QUERY,
          variables: {
            locationIds: ['2a83cf14-b959-47f4-8097-f75a75d1867f'],
            count: 10,
            reviewStatuses: [EVENT_STATUS.DECLARED, EVENT_STATUS.VALIDATED],
            inProgressSkip: 0,
            reviewSkip: 0,
            rejectSkip: 0,
            approvalSkip: 0,
            printSkip: 0
          }
        },
        result: {
          data: {
            inProgressTab: { totalItems: 0, results: [] },
            reviewTab: { totalItems: 0, results: [] },
            rejectTab: { totalItems: 0, results: [] },
            approvalTab: { totalItems: 0, results: [] },
            printTab: { totalItems: 0, results: [] }
          }
        }
      }
    ]

    const testComponent = await createTestComponent(
      // @ts-ignore
      <RegistrationHome
        match={{
          params: {
            tabId: 'print'
          },
          isExact: true,
          path: '',
          url: ''
        }}
      />,
      store,
      graphqlMock
    )

    getItem.mockReturnValue(registerScopeToken)
    await testComponent.store.dispatch(
      checkAuth({ '?token': registerScopeToken })
    )

    // wait for mocked data to load mockedProvider
    await new Promise(resolve => {
      setTimeout(resolve, 500)
    })
    testComponent.component.update()
    const data = testComponent.component.find(GridTable).prop('content')
    expect(data.length).toBe(0)
  })

  it('should show pagination bar if items are more than 11 in ready for print tab', async () => {
    Date.now = jest.fn(() => 1554055200000)
    const graphqlMock = [
      {
        request: {
          query: REGISTRATION_HOME_QUERY,
          variables: {
            locationIds: ['2a83cf14-b959-47f4-8097-f75a75d1867f'],
            count: 10,
            reviewStatuses: [EVENT_STATUS.DECLARED, EVENT_STATUS.VALIDATED],
            inProgressSkip: 0,
            reviewSkip: 0,
            rejectSkip: 0,
            approvalSkip: 0,
            printSkip: 0
          }
        },
        result: {
          data: {
            inProgressTab: { totalItems: 0, results: [] },
            reviewTab: { totalItems: 0, results: [] },
            rejectTab: { totalItems: 0, results: [] },
            approvalTab: { totalItems: 0, results: [] },
            printTab: { totalItems: 14, results: [] }
          }
        }
      }
    ]

    const testComponent = await createTestComponent(
      // @ts-ignore
      <RegistrationHome match={{ params: { tabId: 'print' } }} />,
      store,
      graphqlMock
    )

    getItem.mockReturnValue(registerScopeToken)
    await testComponent.store.dispatch(
      checkAuth({ '?token': registerScopeToken })
    )

    const element = await waitForElement(testComponent.component, '#pagination')

    expect(element.hostNodes()).toHaveLength(1)

    testComponent.component
      .find('#pagination button')
      .last()
      .hostNodes()
      .simulate('click')
  })

  describe('When a row is expanded', () => {
    let expandedRow: any

    beforeEach(async () => {
      Date.now = jest.fn(() => 1554055200000)
      const graphqlMock = [
        {
          request: {
            query: REGISTRATION_HOME_QUERY,
            variables: {
              locationIds: ['2a83cf14-b959-47f4-8097-f75a75d1867f'],
              count: 10,
              reviewStatuses: [EVENT_STATUS.DECLARED, EVENT_STATUS.VALIDATED],
              inProgressSkip: 0,
              reviewSkip: 0,
              rejectSkip: 0,
              approvalSkip: 0,
              printSkip: 0
            }
          },
          result: {
            data: {
              inProgressTab: { totalItems: 0, results: [] },
              reviewTab: { totalItems: 0, results: [] },
              rejectTab: { totalItems: 0, results: [] },
              approvalTab: { totalItems: 0, results: [] },
              printTab: mockPrintTabData
            }
          }
        },
        {
          request: {
            query: FETCH_REGISTRATION_BY_COMPOSITION,
            variables: {
              id: '956281c9-1f47-4c26-948a-970dd23c4094'
            }
          },
          result: {
            data: {
              fetchRegistration: {
                id: '956281c9-1f47-4c26-948a-970dd23c4094',
                registration: {
                  id: '345678',
                  type: 'BIRTH',
                  certificates: null,
                  status: [
                    {
                      id:
                        '17e9b24-b00f-4a0f-a5a4-9c84c6e64e98/_history/86c3044a-329f-418',
                      timestamp: '2019-10-20T11:03:20.660Z',
                      user: {
                        id: '153f8364-96b3-4b90-8527-bf2ec4a367bd',
                        name: [
                          {
                            use: 'en',
                            firstNames: 'Mohammad',
                            familyName: 'Ashraful'
                          },
                          {
                            use: 'bn',
                            firstNames: '',
                            familyName: ''
                          }
                        ],
                        role: 'LOCAL_REGISTRAR'
                      },
                      location: {
                        id: '123',
                        name: 'Kaliganj Union Sub Center',
                        alias: ['']
                      },
                      office: {
                        id: '123',
                        name: 'Kaliganj Union Sub Center',
                        alias: [''],
                        address: {
                          district: '7876',
                          state: 'iuyiuy'
                        }
                      },
                      type: 'REGISTERED',
                      comments: [
                        {
                          comment: 'reason=duplicate&comment=dup'
                        }
                      ]
                    }
                  ],
                  contact: 'MOTHER',
                  contactPhoneNumber: '01622688231'
                },
                child: {
                  id: 'FAKE_ID',
                  name: [
                    {
                      use: 'en',
                      firstNames: 'Mushraful',
                      familyName: 'Hoque'
                    }
                  ],
                  birthDate: '01-01-1984'
                },
                deceased: null,
                informant: null
              }
            }
          }
        }
      ]

      const testComponent = await createTestComponent(
        // @ts-ignore
        <RegistrationHome match={{ params: { tabId: 'print' } }} />,
        store,
        graphqlMock
      )

      getItem.mockReturnValue(registerScopeToken)
      await testComponent.store.dispatch(
        checkAuth({ '?token': registerScopeToken })
      )
      const instance = (await waitForElement(
        testComponent.component,
        GridTable
      )).instance() as any

      instance.toggleExpanded('956281c9-1f47-4c26-948a-970dd23c4094')

      expandedRow = await waitForElement(
        testComponent.component,
        '#REGISTERED-0'
      )
    })

    it('renders expanded area for ready to print', async () => {
      expect(expandedRow.hostNodes().length).toBe(1)
    })

    it('renders correct timestamps for history steps [OCRVS-2214]', async () => {
      expect(
        expandedRow
          .find('#expanded_history_item_timestamp')
          .hostNodes()
          .text()
      ).toBe('Registered on:20 October 2019')
    })
  })

  it('expanded block renders error text when an error occurs', async () => {
    const graphqlMock = [
      {
        request: {
          query: REGISTRATION_HOME_QUERY,
          variables: {
            locationIds: ['2a83cf14-b959-47f4-8097-f75a75d1867f'],
            count: 10,
            reviewStatuses: [EVENT_STATUS.DECLARED, EVENT_STATUS.VALIDATED],
            inProgressSkip: 0,
            reviewSkip: 0,
            rejectSkip: 0,
            approvalSkip: 0,
            printSkip: 0
          }
        },
        result: {
          data: {
            inProgressTab: { totalItems: 0, results: [] },
            reviewTab: { totalItems: 0, results: [] },
            rejectTab: { totalItems: 0, results: [] },
            approvalTab: { totalItems: 0, results: [] },
            printTab: mockPrintTabData
          }
        }
      },
      {
        request: {
          query: FETCH_REGISTRATION_BY_COMPOSITION,
          variables: {
            id: '956281c9-1f47-4c26-948a-970dd23c4094'
          }
        },
        error: new Error('boom')
      }
    ]

    const testComponent = await createTestComponent(
      // @ts-ignore
      <RegistrationHome match={{ params: { tabId: 'print' } }} />,
      store,
      graphqlMock
    )

    getItem.mockReturnValue(registerScopeToken)
    await testComponent.store.dispatch(
      checkAuth({ '?token': registerScopeToken })
    )

    const table = await waitForElement(testComponent.component, GridTable)

    const instance = table.instance()

    instance.toggleExpanded('956281c9-1f47-4c26-948a-970dd23c4094')

    const element = await waitForElement(
      testComponent.component,
      '#search-result-error-text-expanded'
    )

    expect(
      element
        .children()
        .hostNodes()
        .text()
    ).toBe('An error occurred while searching')
  })

  describe('handles download status', () => {
    let testComponent: ReactWrapper<{}, {}>
    let createdTestComponent: { component: ReactWrapper; store: Store }
    beforeEach(async () => {
      Date.now = jest.fn(() => 1554055200000)
      const graphqlMock = [
        {
          request: {
            query: REGISTRATION_HOME_QUERY,
            variables: {
              locationIds: ['2a83cf14-b959-47f4-8097-f75a75d1867f'],
              count: 10,
              reviewStatuses: [EVENT_STATUS.DECLARED, EVENT_STATUS.VALIDATED],
              inProgressSkip: 0,
              reviewSkip: 0,
              rejectSkip: 0,
              approvalSkip: 0,
              printSkip: 0
            }
          },
          result: {
            data: {
              inProgressTab: { totalItems: 0, results: [] },
              reviewTab: { totalItems: 0, results: [] },
              rejectTab: { totalItems: 0, results: [] },
              approvalTab: { totalItems: 0, results: [] },
              printTab: mockPrintTabData
            }
          }
        },
        {
          request: {
            query: GET_DEATH_REGISTRATION_FOR_CERTIFICATION,
            variables: { id: '956281c9-1f47-4c26-948a-970dd23c4094' }
          },
          result: {
            data: {
              fetchDeathRegistration: {
                _fhirIDMap: {
                  composition: '956281c9-1f47-4c26-948a-970dd23c4094'
                },
                id: '956281c9-1f47-4c26-948a-970dd23c4094',
                deceased: {
                  id: 'a6cce2e1-10df-42d0-bbc9-8e037b0bf14e',
                  name: [
                    {
                      use: 'bn',
                      firstNames: 'ক ম আব্দুল্লাহ আল আমিন ',
                      familyName: 'খান'
                    },
                    {
                      use: 'en',
                      firstNames: 'K M Abdullah al amin',
                      familyName: 'Khan'
                    }
                  ],
                  birthDate: '1988-06-16',
                  gender: 'male',
                  maritalStatus: 'MARRIED',
                  nationality: ['BGD'],
                  identifier: [
                    {
                      id: '1020617910288',
                      type: 'NATIONAL_ID',
                      otherType: null
                    }
                  ],
                  deceased: {
                    deathDate: '2019-01-18'
                  },
                  address: [
                    {
                      type: 'PERMANENT',
                      line: [
                        '40 Ward',
                        '',
                        'Bahadur street',
                        'f4d236c5-6328-4e8e-a45b-e307720b7cdf',
                        '',
                        '2612765c-f5a7-4291-9191-7625dd76fa82'
                      ],
                      district: '18dd420e-daec-4d35-9a44-fb58b5185923',
                      state: 'e93b10bc-1318-4dcb-b8b6-35c7532a0a90',
                      city: null,
                      postalCode: '1024',
                      country: 'BGD'
                    },
                    {
                      type: 'CURRENT',
                      line: [
                        '40',
                        '',
                        'My street',
                        'f4d236c5-6328-4e8e-a45b-e307720b7cdf',
                        '',
                        '2612765c-f5a7-4291-9191-7625dd76fa82'
                      ],
                      district: '18dd420e-daec-4d35-9a44-fb58b5185923',
                      state: 'e93b10bc-1318-4dcb-b8b6-35c7532a0a90',
                      city: null,
                      postalCode: '1024',
                      country: 'BGD'
                    }
                  ]
                },
                informant: {
                  id: 'c7e17721-bccf-4dfb-8f85-d6311d1da1bc',
                  relationship: 'OTHER',
                  otherRelationship: 'Friend',
                  individual: {
                    id: '7ac8d0a6-a391-42f9-add4-dec27279474d',
                    identifier: [
                      {
                        id: '1020607917288',
                        type: 'NATIONAL_ID',
                        otherType: null
                      }
                    ],
                    name: [
                      {
                        use: 'bn',
                        firstNames: 'জামাল উদ্দিন খান',
                        familyName: 'খান'
                      },
                      {
                        use: 'en',
                        firstNames: 'Jamal Uddin Khan',
                        familyName: 'Khan'
                      }
                    ],
                    nationality: ['BGD'],
                    birthDate: '1956-10-17',
                    telecom: null,
                    address: [
                      {
                        type: 'CURRENT',
                        line: [
                          '48',
                          '',
                          'My street',
                          'f4d236c5-6328-4e8e-a45b-e307720b7cdf',
                          '',
                          '2612765c-f5a7-4291-9191-7625dd76fa82'
                        ],
                        district: '18dd420e-daec-4d35-9a44-fb58b5185923',
                        state: 'e93b10bc-1318-4dcb-b8b6-35c7532a0a90',
                        city: null,
                        postalCode: '1024',
                        country: 'BGD'
                      },
                      {
                        type: 'PERMANENT',
                        line: [
                          '40 Ward',
                          '',
                          'Bahadur street',
                          'f4d236c5-6328-4e8e-a45b-e307720b7cdf',
                          '',
                          '2612765c-f5a7-4291-9191-7625dd76fa82'
                        ],
                        district: '18dd420e-daec-4d35-9a44-fb58b5185923',
                        state: 'e93b10bc-1318-4dcb-b8b6-35c7532a0a90',
                        city: null,
                        postalCode: '1024',
                        country: 'BGD'
                      }
                    ]
                  }
                },
                registration: {
                  id: 'ba1cb210-b98f-46e1-a185-4c8df2971064',
                  contact: 'OTHER',
                  contactRelationship: 'Colleague',
                  contactPhoneNumber: '+8801678945638',
                  attachments: null,
                  status: [
                    {
                      comments: null,
                      type: 'REGISTERED',
                      location: {
                        name: 'Alokbali',
                        alias: ['আলো্কবালী']
                      },
                      office: {
                        name: 'Alokbali Union Parishad',
                        alias: ['আলোকবালী  ইউনিয়ন পরিষদ'],
                        address: {
                          district: 'Narsingdi',
                          state: 'Dhaka'
                        }
                      }
                    },
                    {
                      comments: null,
                      type: 'DECLARED',
                      location: {
                        name: 'Alokbali',
                        alias: ['আলো্কবালী']
                      },
                      office: {
                        name: 'Alokbali Union Parishad',
                        alias: ['আলোকবালী  ইউনিয়ন পরিষদ'],
                        address: {
                          district: 'Narsingdi',
                          state: 'Dhaka'
                        }
                      }
                    }
                  ],
                  type: 'DEATH',
                  trackingId: 'DG6PECX',
                  registrationNumber: '20196816020000113'
                },
                eventLocation: {
                  id: '7a503721-a258-49ef-9fb9-aa77c970d19b',
                  type: 'PRIVATE_HOME',
                  address: {
                    type: null,
                    line: [
                      '40',
                      '',
                      'My street',
                      'f4d236c5-6328-4e8e-a45b-e307720b7cdf',
                      '',
                      '2612765c-f5a7-4291-9191-7625dd76fa82'
                    ],
                    district: '18dd420e-daec-4d35-9a44-fb58b5185923',
                    state: 'e93b10bc-1318-4dcb-b8b6-35c7532a0a90',
                    city: null,
                    postalCode: '1024',
                    country: 'BGD'
                  }
                },
                mannerOfDeath: 'HOMICIDE',
                causeOfDeathMethod: null,
                causeOfDeath: 'Chronic Obstructive Pulmonary Disease'
              }
            }
          }
        }
      ]

      createdTestComponent = await createTestComponent(
        // @ts-ignore
        <RegistrationHome match={{ params: { tabId: 'print' } }} />,
        store,
        graphqlMock
      )
      testComponent = createdTestComponent.component
      getItem.mockReturnValue(registerScopeToken)
      await createdTestComponent.store.dispatch(
        checkAuth({ '?token': registerScopeToken })
      )
    })

    it('downloads application after clicking download button', async () => {
      const downloadButton = await waitForElement(
        testComponent,
        '#ListItemAction-0-icon'
      )

      downloadButton.hostNodes().simulate('click')

      testComponent.update()

      expect(
        testComponent.find('#action-loading-ListItemAction-0').hostNodes()
      ).toHaveLength(1)

      await new Promise(resolve => {
        setTimeout(resolve, 100)
      })
      testComponent.update()

      const action = await waitForElement(
        testComponent,
        '#ListItemAction-0-Print'
      )
      action.hostNodes().simulate('click')

      await new Promise(resolve => {
        setTimeout(resolve, 100)
      })
      testComponent.update()
      expect(history.location.pathname).toBe(
        '/cert/collector/956281c9-1f47-4c26-948a-970dd23c4094/death/certCollector'
      )
    })

    it('shows error when download is failed', async () => {
      const downloadedApplication = makeApplicationReadyToDownload(
        Event.DEATH,
        'bc09200d-0160-43b4-9e2b-5b9e90424e95',
        Action.LOAD_CERTIFICATE_APPLICATION
      )
      downloadedApplication.downloadStatus = DOWNLOAD_STATUS.FAILED
      createdTestComponent.store.dispatch(
        storeApplication(downloadedApplication)
      )

      testComponent.update()

      const errorIcon = await waitForElement(
        testComponent,
        '#action-error-ListItemAction-1'
      )

      expect(errorIcon.hostNodes()).toHaveLength(1)
    })
  })
})

describe('Tablet tests', () => {
  const { store } = createStore()

  beforeAll(async () => {
    getItem.mockReturnValue(registerScopeToken)
    await store.dispatch(checkAuth({ '?token': registerScopeToken }))
    resizeWindow(800, 1280)
  })

  afterEach(() => {
    resizeWindow(1024, 768)
  })

  it('redirects to detail page if item is clicked', async () => {
    Date.now = jest.fn(() => 1554055200000)
    const graphqlMock = [
      {
        request: {
          query: REGISTRATION_HOME_QUERY,
          variables: {
            locationIds: ['2a83cf14-b959-47f4-8097-f75a75d1867f'],
            count: 10,
            reviewStatuses: [EVENT_STATUS.DECLARED, EVENT_STATUS.VALIDATED],
            inProgressSkip: 0,
            reviewSkip: 0,
            rejectSkip: 0,
            approvalSkip: 0,
            printSkip: 0
          }
        },
        result: {
          data: {
            inProgressTab: { totalItems: 0, results: [] },
            reviewTab: { totalItems: 0, results: [] },
            rejectTab: { totalItems: 0, results: [] },
            approvalTab: { totalItems: 0, results: [] },
            printTab: mockPrintTabData
          }
        }
      }
    ]

    const testComponent = await createTestComponent(
      // @ts-ignore
      <RegistrationHome match={{ params: { tabId: 'print' } }} />,
      store,
      graphqlMock
    )

    testComponent.component.update()
    const element = await waitForElement(testComponent.component, '#row_0')
    element.hostNodes().simulate('click')

    await new Promise(resolve => {
      setTimeout(resolve, 100)
    })
    testComponent.component.update()

    expect(window.location.href).toContain(
      '/details/956281c9-1f47-4c26-948a-970dd23c4094'
    )
  })
})
