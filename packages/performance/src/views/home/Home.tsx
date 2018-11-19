import * as React from 'react'
import { connect } from 'react-redux'
import {
  InjectedIntlProps,
  injectIntl,
  InjectedIntl,
  FormattedHTMLMessage,
  defineMessages
} from 'react-intl'
import { Header, Box } from '@opencrvs/components/lib/interface'
import styled from 'src/styled-components'
import Logo from 'src/components/Logo'
import { Page } from 'src/components/Page'
import { Legend } from '@opencrvs/components/lib/charts'

const messages = defineMessages({
  birthRegistrationBoxTitle: {
    id: 'performance.graph.birthRegistrationBoxTitle',
    defaultMessage: 'Birth Registration Key Figures',
    description: 'Title for the birth registration key figures box.'
  },
  birthRegistrationBoxFooter: {
    id: 'performance.graph.birthRegistrationBoxFooter',
    defaultMessage: 'Estimates provided using National Population Census data',
    description: 'Title for the birth registration key figures box footer.'
  },
  liveBirthsWithin45DaysLabel: {
    id: 'performance.graph.liveBirthsWithin45DaysLabel',
    defaultMessage: 'Registrations<br />45 days of birth',
    description:
      'Live births registered within 45 days of actual birth label on graph'
  },
  liveBirthsWithin45DaysDescription: {
    id: 'performance.graph.liveBirthsWithin45DaysDescription',
    defaultMessage: '142500 out of 204000',
    description:
      'Live births registered within 45 days of actual birth description on graph'
  },
  liveBirthsWithin1yearLabel: {
    id: 'performance.graph.liveBirthsWithin1yearLabel',
    defaultMessage: 'Registrations<br />1 year of actual birth',
    description:
      'Live births registered within 1 year of actual birth label on graph'
  },
  liveBirthsWithin1yearDescription: {
    id: 'performance.graph.liveBirthsWithin1yearDescription',
    defaultMessage: '61500 out of 204000',
    description:
      'Live births registered within 1 year of actual birth description on graph'
  },
  totalLiveBirthsLabel: {
    id: 'performance.graph.totalLiveBirthsLabel',
    defaultMessage: 'Total Live Births registered',
    description: 'Total live births label on graph'
  },
  estimatedBirthsInTimeLabel: {
    id: 'performance.graph.estimatedBirthsInTimeLabel',
    defaultMessage: 'Estimated Births in [time period]',
    description: 'Estimated births in time period label on graph'
  },
  estimatedBirthsInTimeDescription: {
    id: 'performance.graph.estimatedBirthsInTimeDescription',
    defaultMessage: 'Provided from 2018 population census',
    description: 'Estimated births in time period description on graph'
  }
})

interface IData {
  value: number
  label: React.ReactNode
  description?: string
  total?: boolean
  estimate?: boolean
}

const getData = (intl: InjectedIntl): IData[] => {
  return [
    {
      value: 142500,
      label: (
        <FormattedHTMLMessage
          id="graph.label1"
          defaultMessage={intl.formatHTMLMessage(
            messages.liveBirthsWithin45DaysLabel
          )}
        />
      ),
      description: intl.formatMessage(
        messages.liveBirthsWithin45DaysDescription
      )
    },
    {
      value: 61500,
      label: (
        <FormattedHTMLMessage
          id="graph.label2"
          defaultMessage={intl.formatHTMLMessage(
            messages.liveBirthsWithin1yearLabel
          )}
        />
      ),
      description: intl.formatMessage(messages.liveBirthsWithin1yearDescription)
    },
    {
      value: 204000,
      label: (
        <FormattedHTMLMessage
          id="graph.label3"
          defaultMessage={intl.formatHTMLMessage(messages.totalLiveBirthsLabel)}
        />
      ),
      total: true
    }
  ]
}

const StyledHeader = styled(Header)`
  padding: 0 26px;
  box-shadow: none;
`

const BoxTitle = styled.div`
  height: 25px;
  line-height: 25px;
  text-transform: capitalize !important;
  ${({ theme }) => theme.fonts.h2FontStyle}
  color: ${({ theme }) => theme.colors.primary};
`

const FooterText = styled.div`
  height: 17px;
  line-height: 17px;
  margin-top: 25px;
  ${({ theme }) => theme.fonts.infoFontStyle}
  color: ${({ theme }) => theme.colors.copy};
`

const ChartContainer = styled(Box)`
  max-width: ${({ theme }) => theme.grid.breakpoints.lg}px;
  margin: auto;
`

const Container = styled.div`
  padding: 20px 10px;
`
class HomeView extends React.Component<InjectedIntlProps> {
  render() {
    const { intl } = this.props
    return (
      <Page>
        <StyledHeader>
          <Logo />
        </StyledHeader>
        <Container>
          <ChartContainer>
            <BoxTitle id="box_title">
              {intl.formatMessage(messages.birthRegistrationBoxTitle)}
            </BoxTitle>
            <Legend data={getData(intl)} smallestToLargest={false} />
            <FooterText id="footer_text">
              {intl.formatMessage(messages.birthRegistrationBoxFooter)}
            </FooterText>
          </ChartContainer>
        </Container>
      </Page>
    )
  }
}

export const Home = connect(null, null)(injectIntl(HomeView))
