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
import React from 'react'
import { Box } from '@opencrvs/components/lib/interface'
import { FormConfigElementCard } from '@opencrvs/components/lib/interface/FormConfigElementCard'
import styled from '@client/styledComponents'
import { useSelector } from 'react-redux'
import { IStoreState } from '@client/store'
import { FormFieldGenerator } from '@client/components/form/FormFieldGenerator'
import { selectConfigFields } from '@client/forms/configuration/configFields/selectors'
import {
  IConfigField,
  IConfigFieldMap,
  getFieldDefinition
} from '@client/forms/configuration/configFields/utils'
import { getRegisterFormSection } from '@client/forms/register/declaration-selectors'
import { FieldPosition } from '@client/forms/configuration'
import { useParams } from 'react-router'
import { BirthSection, DeathSection, Event } from '@client/forms'

const CanvasBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid ${({ theme }) => theme.colors.grey300};
  border-radius: 4px;
`

function generateConfigFields(formFieldMap: IConfigFieldMap) {
  const firstField = Object.values(formFieldMap).find(
    (formField) => formField.preceedingFieldId === FieldPosition.TOP
  )

  if (!firstField) {
    throw new Error(`No starting field found in section`)
  }

  const configFields: IConfigField[] = []
  let currentField: IConfigField | null = firstField
  while (currentField) {
    configFields.push(currentField)
    currentField = currentField.foregoingFieldId
      ? formFieldMap[currentField.foregoingFieldId]
      : null
  }
  return configFields
}

type IRouteProps = {
  event: Event
  section: BirthSection | DeathSection
}

type ICanvasProps = {
  selectedField: IConfigField | null
  onFieldSelect: (field: IConfigField) => void
}

export function Canvas({ selectedField, onFieldSelect }: ICanvasProps) {
  const { event, section } = useParams<IRouteProps>()
  const fieldsMap = useSelector((store: IStoreState) =>
    selectConfigFields(store, event, section)
  )
  const formSection = useSelector((store: IStoreState) =>
    getRegisterFormSection(store, section, event)
  )
  const configFields = generateConfigFields(fieldsMap)

  return (
    <CanvasBox>
      {configFields.map((configField) => (
        <FormConfigElementCard
          key={configField.fieldId}
          selected={selectedField?.fieldId === configField.fieldId}
          onClick={() => onFieldSelect(configField)}
        >
          <FormFieldGenerator
            id={configField.fieldId}
            onChange={() => {}}
            fields={[getFieldDefinition(formSection, configField)]}
            setAllFieldsDirty={false}
          />
        </FormConfigElementCard>
      ))}
    </CanvasBox>
  )
}
