import { Container } from '@/components/container'
import { Grid } from '@/components/grid'
import { Heading } from '@/components/heading'
import { List } from '@/components/list'
import { Paragraph } from '@/components/paragraph'
import { Price } from '@/components/price'
import { Section } from '@/components/section'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Writeup } from '@/components/writeup'
import * as React from 'react'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  pricings?: {
    title?: string
    description?: string
    price?: React.ComponentProps<typeof Price>
    list?: React.ComponentProps<typeof List>['items']
    button?: React.ComponentProps<typeof Button> & { text?: string }
  }[]
  children?: React.ReactNode
}

function Pricings1({ pricings, children }: Props) {
  return (
    <Section className="features features-1">
      <Container className="flex flex-col items-center gap-16">
        <Writeup
          className="flex flex-col items-center text-center"
          size="lg"
        >
          {children}
        </Writeup>
        <Grid length={pricings?.length}>
          {pricings?.map(({ title, description, price, list, button }) => (
            <Card
              className="flex flex-col gap-4 text-lg"
              key={uuidv4()}
            >
              <Heading as="h3">{title}</Heading>
              <Paragraph>{description}</Paragraph>
              <Price
                className="text-2xl font-medium"
                {...price}
              />
              <List
                className="!mt-8"
                items={list}
              />
              <Button
                className="!mt-8"
                {...button}
              >
                {button?.text}
              </Button>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}

export { Pricings1 }
