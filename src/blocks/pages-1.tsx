import { Box } from '@/components/box'
import Buttons from '@/components/buttons'
import { Container } from '@/components/container'
import { Grid } from '@/components/grid'
import { Heading } from '@/components/heading'
import { Image } from '@/components/image'
import { Link } from '@/components/link'
import { Paragraph } from '@/components/paragraph'
import { Section } from '@/components/section'
import { Writeup } from '@/components/writeup'
import * as React from 'react'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  buttons?: React.ComponentProps<typeof Buttons>['buttons']
  pages?: {
    href?: string
    title?: string
    description?: string
    image?: React.ComponentProps<typeof Image>
  }[]
  children?: React.ReactNode
}

function Pages1({ buttons, pages, children }: Props) {
  return (
    <Section className="pages pages-1">
      <Container className="flex flex-col items-center gap-16">
        <Box className="flex flex-col items-center gap-8">
          <Writeup className="items-center text-center">{children}</Writeup>
          <Buttons buttons={buttons} />
        </Box>
        <Grid length={pages?.length}>
          {pages?.map(({ href, title, description, image }) => (
            <Link
              key={uuidv4()}
              className="group flex flex-col gap-4"
              href={href}
            >
              <Image
                className="rounded-lg transition-opacity group-hover:opacity-75"
                {...image}
              />
              <Heading as="h3">{title}</Heading>
              <Paragraph>{description}</Paragraph>
            </Link>
          ))}
        </Grid>
        <Buttons buttons={buttons} />
      </Container>
    </Section>
  )
}

export { Pages1 }
