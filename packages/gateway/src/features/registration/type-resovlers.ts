import {
  findCompositionSection,
  findExtension,
  fetchFHIR
} from 'src/features/fhir/utils'
import {
  MOTHER_CODE,
  FATHER_CODE,
  CHILD_CODE,
  ATTACHMENT_DOCS_CODE,
  BIRTH_ENCOUNTER_CODE,
  BODY_WEIGHT_CODE,
  BIRTH_TYPE_CODE,
  BIRTH_ATTENDANT_CODE,
  BIRTH_REG_PRESENT_CODE,
  BIRTH_REG_TYPE_CODE,
  LAST_LIVE_BIRTH_CODE,
  NUMBER_BORN_ALIVE_CODE,
  NUMBER_FOEATAL_DEATH_CODE,
  DECEASED_CODE,
  INFORMANT_CODE,
  DEATH_ENCOUNTER_CODE,
  MANNER_OF_DEATH_CODE,
  CAUSE_OF_DEATH_CODE,
  CAUSE_OF_DEATH_METHOD_CODE
} from 'src/features/fhir/templates'
import { GQLResolver } from 'src/graphql/schema'
import {
  ORIGINAL_FILE_NAME_SYSTEM,
  SYSTEM_FILE_NAME_SYSTEM,
  FHIR_SPECIFICATION_URL,
  OPENCRVS_SPECIFICATION_URL
} from 'src/features/fhir/constants'
import { ITemplatedComposition } from './fhir-builders'

export const typeResolvers: GQLResolver = {
  EventRegistration: {
    __resolveType(obj) {
      if (obj.type.coding[0].code === 'birth-declaration') {
        return 'BirthRegistration'
      } else {
        return 'DeathRegistration'
      }
    }
  },
  HumanName: {
    firstNames(name) {
      return (name.given && name.given.join(' ')) || ''
    },
    familyName(name) {
      if (!name.family) {
        return null
      }
      return name.family.join(' ')
    }
  },

  Person: {
    /* `gender` and `name` resolvers are trivial resolvers, so they don't need implementation */
    dateOfMarriage: person => {
      const marriageExtension = findExtension(
        `${OPENCRVS_SPECIFICATION_URL}extension/date-of-marriage`,
        person.extension
      )
      return (marriageExtension && marriageExtension.valueDateTime) || null
    },
    maritalStatus: person => {
      return person.maritalStatus.text
    },
    multipleBirth: person => {
      return person.multipleBirthInteger
    },
    deceased: person => {
      return person
    },
    nationality: person => {
      const nationalityExtension = findExtension(
        `${FHIR_SPECIFICATION_URL}patient-nationality`,
        person.extension
      )
      if (!nationalityExtension || !nationalityExtension.extension) {
        return null
      }
      const countryCodeExtension = findExtension(
        'code',
        nationalityExtension.extension
      )

      const coding =
        (countryCodeExtension &&
          countryCodeExtension.valueCodeableConcept &&
          countryCodeExtension.valueCodeableConcept.coding &&
          countryCodeExtension.valueCodeableConcept.coding) ||
        []

      // Nationality could be multiple
      const nationality = coding.map(n => {
        return n.code
      })

      return nationality
    },
    educationalAttainment: person => {
      const educationalAttainmentExtension = findExtension(
        `${OPENCRVS_SPECIFICATION_URL}extension/educational-attainment`,
        person.extension
      )
      return (
        (educationalAttainmentExtension &&
          educationalAttainmentExtension.valueString) ||
        null
      )
    }
  },
  RelatedPerson: {
    relationship: relatedPerson => {
      return (
        relatedPerson &&
        relatedPerson.relationship &&
        relatedPerson.relationship.coding &&
        relatedPerson.relationship.coding[0].code
      )
    },
    otherRelationship: relatedPerson => {
      return (
        relatedPerson &&
        relatedPerson.relationship &&
        relatedPerson.relationship.text
      )
    },
    individual: async (relatedPerson, _, authHeader) => {
      return await fetchFHIR(`/${relatedPerson.patient.reference}`, authHeader)
    }
  },
  Deceased: {
    deceased: person => {
      return person && person.deceasedBoolean
    },
    deathDate: person => {
      return person && person.deceasedDateTime
    }
  },
  Registration: {
    async trackingId(task: fhir.Task) {
      let trackingId =
        task &&
        task.code &&
        task.code.coding &&
        task.code.coding[0] &&
        task.code.coding[0].code
      if (trackingId === 'BIRTH') {
        trackingId = 'birth-tracking-id'
      } else {
        trackingId = 'death-tracking-id'
      }
      const foundIdentifier =
        task.identifier &&
        task.identifier.find(
          (identifier: fhir.Identifier) =>
            identifier.system ===
            `${OPENCRVS_SPECIFICATION_URL}id/${trackingId}`
        )

      return (foundIdentifier && foundIdentifier.value) || null
    },
    async registrationNumber(task: fhir.Task) {
      let regNoType =
        task &&
        task.code &&
        task.code.coding &&
        task.code.coding[0] &&
        task.code.coding[0].code
      if (regNoType === 'BIRTH') {
        regNoType = 'birth-registration-number'
      } else {
        regNoType = 'death-registration-number'
      }
      const foundIdentifier =
        task.identifier &&
        task.identifier.find(
          (identifier: fhir.Identifier) =>
            identifier.system === `${OPENCRVS_SPECIFICATION_URL}id/${regNoType}`
        )

      return (foundIdentifier && foundIdentifier.value) || null
    },
    async attachments(task: fhir.Task, _, authHeader) {
      if (!task.focus) {
        throw new Error(
          'Task resource does not have a focus property necessary to lookup the composition'
        )
      }

      const composition = await fetchFHIR(
        `/${task.focus.reference}`,
        authHeader
      )
      const docSection = findCompositionSection(
        ATTACHMENT_DOCS_CODE,
        composition
      )
      if (!docSection || !docSection.entry) {
        return null
      }
      const docRefReferences = docSection.entry.map(
        (docRefEntry: fhir.Reference) => docRefEntry.reference
      )
      return docRefReferences.map(async (docRefReference: string) => {
        return await fetchFHIR(`/${docRefReference}`, authHeader)
      })
    },
    contact: task => {
      const contact = findExtension(
        `${OPENCRVS_SPECIFICATION_URL}extension/contact-person`,
        task.extension
      )
      return (contact && contact.valueString) || null
    },
    paperFormID: task => {
      const foundIdentifier =
        task.identifier &&
        task.identifier.find(
          (identifier: fhir.Identifier) =>
            identifier.system ===
            `${OPENCRVS_SPECIFICATION_URL}id/paper-form-id`
        )

      return (foundIdentifier && foundIdentifier.value) || null
    },
    page: task => {
      const foundIdentifier =
        task.identifier &&
        task.identifier.find(
          (identifier: fhir.Identifier) =>
            identifier.system ===
            `${OPENCRVS_SPECIFICATION_URL}id/paper-form-page`
        )

      return (foundIdentifier && foundIdentifier.value) || null
    },
    book: task => {
      const foundIdentifier =
        task.identifier &&
        task.identifier.find(
          (identifier: fhir.Identifier) =>
            identifier.system ===
            `${OPENCRVS_SPECIFICATION_URL}id/paper-form-book`
        )

      return (foundIdentifier && foundIdentifier.value) || null
    },
    status: async (task: fhir.Task, _, authHeader) => {
      // fetch full task history
      const taskBundle: fhir.Bundle = await fetchFHIR(
        `/Task/${task.id}/_history`,
        authHeader
      )
      return (
        taskBundle.entry &&
        taskBundle.entry.map((taskEntry: fhir.BundleEntry, i) => {
          const historicalTask = taskEntry.resource
          // all these tasks will have the same id, make it more specific to keep apollo-client's cache happy
          if (historicalTask && historicalTask.meta) {
            historicalTask.id = `${historicalTask.id}/_history/${
              historicalTask.meta.versionId
            }`
          }
          return historicalTask
        })
      )
    },
    type: task => {
      const taskType = task.code
      const taskCode = taskType.coding.find(
        (coding: fhir.Coding) =>
          coding.system === `${OPENCRVS_SPECIFICATION_URL}types`
      )
      return (taskCode && taskCode.code) || null
    },
    duplicates: async (task, _, authHeader) => {
      if (!task.focus) {
        throw new Error(
          'Task resource does not have a focus property necessary to lookup the composition'
        )
      }

      const composition = await fetchFHIR(
        `/${task.focus.reference}`,
        authHeader
      )
      return (
        composition.relatesTo &&
        composition.relatesTo.map((duplicate: fhir.CompositionRelatesTo) => {
          if (
            duplicate.code &&
            duplicate.code === 'duplicate' &&
            duplicate.targetReference &&
            duplicate.targetReference.reference
          ) {
            return duplicate.targetReference.reference.split('/')[1]
          }
          return null
        })
      )
    }
  },
  RegWorkflow: {
    type: (task: fhir.Task) => {
      const taskStatus = task.businessStatus
      const taskStatusCoding = taskStatus && taskStatus.coding
      const statusType =
        taskStatusCoding &&
        taskStatusCoding.find(
          (coding: fhir.Coding) =>
            coding.system === `${OPENCRVS_SPECIFICATION_URL}reg-status`
        )

      return (statusType && statusType.code) || null
    },
    user: async (task, _, authHeader) => {
      const user = findExtension(
        `${OPENCRVS_SPECIFICATION_URL}extension/regLastUser`,
        task.extension
      )
      if (!user || !user.valueReference) {
        return null
      }
      return await fetchFHIR(`/${user.valueReference.reference}`, authHeader)
    },

    timestamp: task => task.lastModified,
    comments: task => task.note,
    location: async (task, _, authHeader) => {
      const taskLocation = findExtension(
        `${OPENCRVS_SPECIFICATION_URL}extension/regLastLocation`,
        task.extension
      )
      if (!taskLocation || !taskLocation.valueReference) {
        return null
      }
      return await fetchFHIR(
        `/${taskLocation.valueReference.reference}`,
        authHeader
      )
    },
    office: async (task, _, authHeader) => {
      const taskLocation = findExtension(
        `${OPENCRVS_SPECIFICATION_URL}extension/regLastOffice`,
        task.extension
      )
      if (!taskLocation || !taskLocation.valueReference) {
        return null
      }
      return await fetchFHIR(
        `/${taskLocation.valueReference.reference}`,
        authHeader
      )
    }
  },
  User: {
    role: async (user, _, authHeader) => {
      const practitionerRole = await fetchFHIR(
        `/PractitionerRole?practitioner=${user.id}`,
        authHeader
      )
      const roleEntry = practitionerRole.entry[0].resource
      if (
        !roleEntry ||
        !roleEntry.code ||
        !roleEntry.code[0] ||
        !roleEntry.code[0].coding ||
        !roleEntry.code[0].coding[0] ||
        !roleEntry.code[0].coding[0].code
      ) {
        throw new Error('PractitionerRole has no role code')
      }
      const role = roleEntry.code[0].coding[0].code

      return role
    }
  },
  Comment: {
    user: comment => comment.authorString,
    comment: comment => comment.text,
    createdAt: comment => comment.time
  },
  Attachment: {
    id(docRef: fhir.DocumentReference) {
      return (docRef.masterIdentifier && docRef.masterIdentifier.value) || null
    },
    data(docRef: fhir.DocumentReference) {
      return docRef.content[0].attachment.data
    },
    contentType(docRef: fhir.DocumentReference) {
      return docRef.content[0].attachment.contentType
    },
    originalFileName(docRef: fhir.DocumentReference) {
      const foundIdentifier =
        docRef.identifier &&
        docRef.identifier.find(
          (identifier: fhir.Identifier) =>
            identifier.system === ORIGINAL_FILE_NAME_SYSTEM
        )
      return (foundIdentifier && foundIdentifier.value) || null
    },
    systemFileName(docRef: fhir.DocumentReference) {
      const foundIdentifier =
        docRef.identifier &&
        docRef.identifier.find(
          (identifier: fhir.Identifier) =>
            identifier.system === SYSTEM_FILE_NAME_SYSTEM
        )
      return (foundIdentifier && foundIdentifier.value) || null
    },
    type(docRef: fhir.DocumentReference) {
      return (
        (docRef.type && docRef.type.coding && docRef.type.coding[0].code) ||
        null
      )
    },
    subject(docRef: fhir.DocumentReference) {
      return (docRef.subject && docRef.subject.display) || null
    },
    createdAt(docRef: fhir.DocumentReference) {
      return docRef.created
    }
  },

  Identifier: {
    system: identifier => identifier.system,
    value: identifier => identifier.value
  },

  Location: {
    name: location => location.name,
    status: location => location.status,
    identifier: location => location.identifier,
    longitude: location => location.position.longitude,
    latitude: location => location.position.latitude,
    alias: location => location.alias,
    description: location => location.description,
    partOf: location => location.partOf,
    type: (location: fhir.Location) => {
      return (
        (location.type &&
          location.type.coding &&
          location.type.coding[0].code) ||
        null
      )
    },
    address: location => location.address
  },
  DeathRegistration: {
    createdAt(composition: ITemplatedComposition) {
      return composition.date
    },
    async deceased(composition: ITemplatedComposition, _, authHeader) {
      const patientSection = findCompositionSection(DECEASED_CODE, composition)
      if (!patientSection || !patientSection.entry) {
        return null
      }
      return await fetchFHIR(
        `/${patientSection.entry[0].reference}`,
        authHeader
      )
    },
    async informant(composition: ITemplatedComposition, _, authHeader) {
      const patientSection = findCompositionSection(INFORMANT_CODE, composition)
      if (!patientSection || !patientSection.entry) {
        return null
      }
      return (await fetchFHIR(
        `/${patientSection.entry[0].reference}`,
        authHeader
      )) as fhir.RelatedPerson
    },
    async registration(composition: ITemplatedComposition, _, authHeader) {
      const taskBundle = await fetchFHIR(
        `/Task?focus=Composition/${composition.id}`,
        authHeader
      )

      if (!taskBundle.entry[0] || !taskBundle.entry[0].resource) {
        return null
      }
      return taskBundle.entry[0].resource
    },

    async eventLocation(composition: ITemplatedComposition, _, authHeader) {
      const encounterSection = findCompositionSection(
        DEATH_ENCOUNTER_CODE,
        composition
      )
      if (!encounterSection || !encounterSection.entry) {
        return null
      }
      const data = await fetchFHIR(
        `/${encounterSection.entry[0].reference}`,
        authHeader
      )

      if (!data || !data.location || !data.location[0].location) {
        return null
      }

      return await fetchFHIR(
        `/${data.location[0].location.reference}`,
        authHeader
      )
    },
    async mannerOfDeath(composition: ITemplatedComposition, _, authHeader) {
      const encounterSection = findCompositionSection(
        DEATH_ENCOUNTER_CODE,
        composition
      )
      if (!encounterSection || !encounterSection.entry) {
        return null
      }
      const observations = await fetchFHIR(
        `/Observation?encounter=${
          encounterSection.entry[0].reference
        }&code=${MANNER_OF_DEATH_CODE}`,
        authHeader
      )
      return (
        (observations &&
          observations.entry &&
          observations.entry[0] &&
          observations.entry[0].resource.valueString) ||
        null
      )
    },
    async causeOfDeathMethod(
      composition: ITemplatedComposition,
      _,
      authHeader
    ) {
      const encounterSection = findCompositionSection(
        DEATH_ENCOUNTER_CODE,
        composition
      )
      if (!encounterSection || !encounterSection.entry) {
        return null
      }
      const observations = await fetchFHIR(
        `/Observation?encounter=${
          encounterSection.entry[0].reference
        }&code=${CAUSE_OF_DEATH_METHOD_CODE}`,
        authHeader
      )
      return (
        (observations &&
          observations.entry &&
          observations.entry[0] &&
          observations.entry[0].resource.valueString) ||
        null
      )
    },
    async causeOfDeath(composition: ITemplatedComposition, _, authHeader) {
      const encounterSection = findCompositionSection(
        DEATH_ENCOUNTER_CODE,
        composition
      )
      if (!encounterSection || !encounterSection.entry) {
        return null
      }
      const observations = await fetchFHIR(
        `/Observation?encounter=${
          encounterSection.entry[0].reference
        }&code=${CAUSE_OF_DEATH_CODE}`,
        authHeader
      )

      return (
        (observations &&
          observations.entry &&
          observations.entry[0] &&
          observations.entry[0].resource.valueCodeableConcept &&
          observations.entry[0].resource.valueCodeableConcept.coding &&
          observations.entry[0].resource.valueCodeableConcept.coding[0] &&
          observations.entry[0].resource.valueCodeableConcept.coding[0].code) ||
        null
      )
    }
  },
  BirthRegistration: {
    async _fhirIDMap(composition: ITemplatedComposition, _, authHeader) {
      // Preparing Encounter
      const encounterSection = findCompositionSection(
        BIRTH_ENCOUNTER_CODE,
        composition
      )

      const encounterReference =
        encounterSection &&
        encounterSection.entry &&
        encounterSection.entry[0].reference

      if (!encounterReference) {
        return {
          composition: composition.id
        }
      }

      const observation = {}
      const observations = await fetchFHIR(
        `/Observation?encounter=${encounterReference}`,
        authHeader
      )

      const encounter = await fetchFHIR(`/${encounterReference}`, authHeader)

      if (observations) {
        const observationKeys = {
          weightAtBirth: BODY_WEIGHT_CODE,
          birthType: BIRTH_TYPE_CODE,
          attendantAtBirth: BIRTH_ATTENDANT_CODE,
          birthRegistrationType: BIRTH_REG_TYPE_CODE,
          presentAtBirthRegistration: BIRTH_REG_PRESENT_CODE,
          childrenBornAliveToMother: NUMBER_BORN_ALIVE_CODE,
          foetalDeathsToMother: NUMBER_FOEATAL_DEATH_CODE,
          lastPreviousLiveBirth: LAST_LIVE_BIRTH_CODE
        }
        observations.entry.map(
          (item: fhir.Observation & { resource: fhir.Observation }) => {
            if (
              item.resource &&
              item.resource.code.coding &&
              item.resource.code.coding[0] &&
              item.resource.code.coding[0].code
            ) {
              const itemCode = item.resource.code.coding[0].code
              const observationKey = Object.keys(observationKeys).find(
                key => observationKeys[key] === itemCode
              )
              if (observationKey) {
                observation[observationKey] = item.resource.id
              }
            }
          }
        )
      }

      return {
        composition: composition.id,
        encounter: encounterReference.split('/')[1],
        eventLocation: encounter.location[0].location.reference.split('/')[1],
        observation
      }
    },
    createdAt(composition: ITemplatedComposition) {
      return composition.date
    },
    async mother(composition: ITemplatedComposition, _, authHeader) {
      const patientSection = findCompositionSection(MOTHER_CODE, composition)
      if (!patientSection || !patientSection.entry) {
        return null
      }
      return await fetchFHIR(
        `/${patientSection.entry[0].reference}`,
        authHeader
      )
    },
    async father(composition: ITemplatedComposition, _, authHeader) {
      const patientSection = findCompositionSection(FATHER_CODE, composition)
      if (!patientSection || !patientSection.entry) {
        return null
      }
      return await fetchFHIR(
        `/${patientSection.entry[0].reference}`,
        authHeader
      )
    },
    async child(composition: ITemplatedComposition, _, authHeader) {
      const patientSection = findCompositionSection(CHILD_CODE, composition)
      if (!patientSection || !patientSection.entry) {
        return null
      }
      return await fetchFHIR(
        `/${patientSection.entry[0].reference}`,
        authHeader
      )
    },
    async registration(composition: ITemplatedComposition, _, authHeader) {
      const taskBundle = await fetchFHIR(
        `/Task?focus=Composition/${composition.id}`,
        authHeader
      )

      if (!taskBundle.entry[0] || !taskBundle.entry[0].resource) {
        return null
      }
      return taskBundle.entry[0].resource
    },
    async weightAtBirth(composition: ITemplatedComposition, _, authHeader) {
      const encounterSection = findCompositionSection(
        BIRTH_ENCOUNTER_CODE,
        composition
      )
      if (!encounterSection || !encounterSection.entry) {
        return null
      }
      const observations = await fetchFHIR(
        `/Observation?encounter=${
          encounterSection.entry[0].reference
        }&code=${BODY_WEIGHT_CODE}`,
        authHeader
      )
      return (
        (observations &&
          observations.entry &&
          observations.entry[0] &&
          observations.entry[0].resource.valueQuantity.value) ||
        null
      )
    },
    async birthType(composition: ITemplatedComposition, _, authHeader) {
      const encounterSection = findCompositionSection(
        BIRTH_ENCOUNTER_CODE,
        composition
      )
      if (!encounterSection || !encounterSection.entry) {
        return null
      }
      const observations = await fetchFHIR(
        `/Observation?encounter=${
          encounterSection.entry[0].reference
        }&code=${BIRTH_TYPE_CODE}`,
        authHeader
      )
      return (
        (observations &&
          observations.entry &&
          observations.entry[0] &&
          observations.entry[0].resource.valueQuantity.value) ||
        null
      )
    },
    async eventLocation(composition: ITemplatedComposition, _, authHeader) {
      const encounterSection = findCompositionSection(
        BIRTH_ENCOUNTER_CODE,
        composition
      )
      if (!encounterSection || !encounterSection.entry) {
        return null
      }
      const data = await fetchFHIR(
        `/${encounterSection.entry[0].reference}`,
        authHeader
      )

      if (!data || !data.location || !data.location[0].location) {
        return null
      }

      return await fetchFHIR(
        `/${data.location[0].location.reference}`,
        authHeader
      )
    },
    async attendantAtBirth(composition: ITemplatedComposition, _, authHeader) {
      const encounterSection = findCompositionSection(
        BIRTH_ENCOUNTER_CODE,
        composition
      )
      if (!encounterSection || !encounterSection.entry) {
        return null
      }
      const observations = await fetchFHIR(
        `/Observation?encounter=${
          encounterSection.entry[0].reference
        }&code=${BIRTH_ATTENDANT_CODE}`,
        authHeader
      )
      return (
        (observations &&
          observations.entry &&
          observations.entry[0] &&
          observations.entry[0].resource.valueString) ||
        null
      )
    },
    async birthRegistrationType(
      composition: ITemplatedComposition,
      _,
      authHeader
    ) {
      const encounterSection = findCompositionSection(
        BIRTH_ENCOUNTER_CODE,
        composition
      )
      if (!encounterSection || !encounterSection.entry) {
        return null
      }
      const observations = await fetchFHIR(
        `/Observation?encounter=${
          encounterSection.entry[0].reference
        }&code=${BIRTH_REG_TYPE_CODE}`,
        authHeader
      )
      return (
        (observations &&
          observations.entry &&
          observations.entry[0] &&
          observations.entry[0].resource.valueString) ||
        null
      )
    },
    async presentAtBirthRegistration(
      composition: ITemplatedComposition,
      _,
      authHeader
    ) {
      const encounterSection = findCompositionSection(
        BIRTH_ENCOUNTER_CODE,
        composition
      )
      if (!encounterSection || !encounterSection.entry) {
        return null
      }
      const observations = await fetchFHIR(
        `/Observation?encounter=${
          encounterSection.entry[0].reference
        }&code=${BIRTH_REG_PRESENT_CODE}`,
        authHeader
      )
      return (
        (observations &&
          observations.entry &&
          observations.entry[0] &&
          observations.entry[0].resource.valueString) ||
        null
      )
    },
    async childrenBornAliveToMother(
      composition: ITemplatedComposition,
      _,
      authHeader
    ) {
      const encounterSection = findCompositionSection(
        BIRTH_ENCOUNTER_CODE,
        composition
      )
      if (!encounterSection || !encounterSection.entry) {
        return null
      }
      const observations = await fetchFHIR(
        `/Observation?encounter=${
          encounterSection.entry[0].reference
        }&code=${NUMBER_BORN_ALIVE_CODE}`,
        authHeader
      )
      return (
        (observations &&
          observations.entry &&
          observations.entry[0] &&
          observations.entry[0].resource.valueInteger) ||
        null
      )
    },
    async foetalDeathsToMother(
      composition: ITemplatedComposition,
      _,
      authHeader
    ) {
      const encounterSection = findCompositionSection(
        BIRTH_ENCOUNTER_CODE,
        composition
      )
      if (!encounterSection || !encounterSection.entry) {
        return null
      }
      const observations = await fetchFHIR(
        `/Observation?encounter=${
          encounterSection.entry[0].reference
        }&code=${NUMBER_FOEATAL_DEATH_CODE}`,
        authHeader
      )
      return (
        (observations &&
          observations.entry &&
          observations.entry[0] &&
          observations.entry[0].resource.valueInteger) ||
        null
      )
    },
    async lastPreviousLiveBirth(
      composition: ITemplatedComposition,
      _,
      authHeader
    ) {
      const encounterSection = findCompositionSection(
        BIRTH_ENCOUNTER_CODE,
        composition
      )
      if (!encounterSection || !encounterSection.entry) {
        return null
      }
      const observations = await fetchFHIR(
        `/Observation?encounter=${
          encounterSection.entry[0].reference
        }&code=${LAST_LIVE_BIRTH_CODE}`,
        authHeader
      )
      return (
        (observations &&
          observations.entry &&
          observations.entry[0] &&
          observations.entry[0].resource.valueDateTime) ||
        null
      )
    }
  }
}
