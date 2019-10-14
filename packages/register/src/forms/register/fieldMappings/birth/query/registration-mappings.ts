import {
  IFormData,
  Event,
  TransformedData,
  IFormField,
  IFormFieldQueryMapFunction
} from '@register/forms'
import {
  GQLRegWorkflow,
  GQLRegStatus
} from '@opencrvs/gateway/src/graphql/schema'
import { get, cloneDeep } from 'lodash'
import { callingCountries } from 'country-data'

export function transformStatusData(
  transformedData: IFormData,
  statusData: GQLRegWorkflow[],
  sectionId: string
) {
  const registrationStatus =
    statusData &&
    statusData.find(status => {
      return status.type && (status.type as GQLRegStatus) === 'REGISTERED'
    })
  if (!registrationStatus) {
    return transformedData
  }
  transformedData[sectionId] = {
    ...transformedData[sectionId],
    regStatus: {
      type: registrationStatus.type || '',
      officeName:
        (registrationStatus.office && registrationStatus.office.name) || '',
      officeAlias:
        (registrationStatus.office &&
          registrationStatus.office.alias &&
          registrationStatus.office.alias.join(' ')) ||
        '',
      officeAddressLevel3:
        (registrationStatus.office &&
          registrationStatus.office.address &&
          registrationStatus.office.address.district) ||
        '',
      officeAddressLevel4:
        (registrationStatus.office &&
          registrationStatus.office.address &&
          registrationStatus.office.address.state) ||
        ''
    }
  }
  return transformedData
}

export function getBirthRegistrationSectionTransformer(
  transformedData: IFormData,
  queryData: any,
  sectionId: string
) {
  if (queryData[sectionId].trackingId) {
    transformedData[sectionId].trackingId = queryData[sectionId].trackingId
  }

  if (queryData[sectionId].registrationNumber) {
    transformedData[sectionId].registrationNumber =
      queryData[sectionId].registrationNumber
  }

  if (queryData[sectionId].type && queryData[sectionId].type === 'BIRTH') {
    transformedData[sectionId].type = Event.BIRTH
  }

  if (queryData[sectionId].status) {
    transformStatusData(
      transformedData,
      queryData[sectionId].status as GQLRegWorkflow[],
      sectionId
    )
  }
}

const convertToLocal = (mobileWithCountryCode: string, countryCode: string) => {
  countryCode = countryCode.toUpperCase()
  return mobileWithCountryCode.replace(
    callingCountries[countryCode].countryCallingCodes[0],
    '0'
  )
}

export const localPhoneTransformer = (transformedFieldName?: string) => (
  transformedData: TransformedData,
  queryData: IFormData,
  sectionId: string,
  field: IFormField
) => {
  let fieldName = transformedFieldName || field.name
  const msisdnPhone = (get(queryData, fieldName as string) as unknown) as string
  const localPhone = convertToLocal(msisdnPhone, window.config.COUNTRY)
  transformedData[sectionId][field.name] = localPhone
  return transformedData
}

export const changeHirerchyQueryTransformer = (
  transformedFieldName?: string,
  transformerMethod?: IFormFieldQueryMapFunction
) => (
  transformedData: TransformedData,
  queryData: IFormData,
  sectionId: string,
  field: IFormField,
  nestedField: IFormField
) => {
  if (transformedFieldName) {
    transformedData[sectionId][field.name]['nestedFields'][
      nestedField.name
    ] = get(queryData, transformedFieldName)

    if (transformerMethod) {
      const clonedTransformedData = cloneDeep(transformedData)
      transformerMethod(clonedTransformedData, queryData, sectionId, field)

      transformedData[sectionId][field.name]['nestedFields'][nestedField.name] =
        clonedTransformedData[sectionId][field.name]
    }
  } else {
    transformedData[sectionId][field.name]['nestedFields'][
      nestedField.name
    ] = get(queryData, `${sectionId}.${nestedField.name}`)
  }

  return transformedData
}
