import { Box } from '@/components/box'
import Buttons from '@/components/buttons'
import { Container } from '@/components/container'
import { Grid } from '@/components/grid'
import { Heading } from '@/components/heading'
import { Image } from '@/components/image'
import { Link } from '@/components/link'
import { Section } from '@/components/section'
import { Writeup } from '@/components/writeup'
import * as React from 'react'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  buttons?: React.ComponentProps<typeof Buttons>['buttons']
  collections?: {
    href?: React.ComponentProps<typeof Link>['href']
    image?: React.ComponentProps<typeof Image>
    title?: string
  }[]
  children?: React.ReactNode
}

function Collections1({ buttons, collections, children }: Props) {
  return (
    <Section className="collections collections-1">
      <Container className="flex flex-col gap-8">
        <Box className="flex flex-col items-center gap-8">
          <Writeup className="items-center text-center">{children}</Writeup>
          <Buttons
            className="max-lg:hidden"
            buttons={buttons}
          />
        </Box>
        <Grid length={collections?.length}>
          {collections?.map(({ href, title, image }) => (
            <Link
              className="group flex flex-col gap-4"
              key={uuidv4()}
              href={href}
            >
              <Image
                className="aspect-square rounded-lg transition-opacity group-hover:opacity-75"
                {...image}
              />
              <Heading as="h3">{title}</Heading>
            </Link>
          ))}
        </Grid>
        <Buttons
          className="lg:hidden"
          buttons={buttons}
        />
      </Container>
    </Section>
  )
}

export { Collections1 }
