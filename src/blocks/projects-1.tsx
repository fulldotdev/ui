import { Buttons } from '@/components/buttons'
import { Column } from '@/components/column'
import { Container } from '@/components/container'
import { Grid } from '@/components/grid'
import { Heading } from '@/components/heading'
import { Image } from '@/components/image'
import { Link } from '@/components/Link'
import { Section } from '@/components/section'
import { Writeup } from '@/components/writeup'
import * as React from 'react'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  align?: 'start' | 'center' | 'end'
  title?: React.ComponentProps<typeof Writeup>['title']
  description?: React.ComponentProps<typeof Writeup>['description']
  buttons?: React.ComponentProps<typeof Buttons>['buttons']
  projects?: {
    href?: React.ComponentProps<typeof Link>['href']
    title?: string
    image?: React.ComponentProps<typeof Image>
  }[]
  children?: React.ReactNode
}

function Projects1({ align = 'center', title, description, buttons, projects, children }: Props) {
  return (
    <Section className="projects projects-1">
      <Container className="flex flex-col items-center gap-16">
        <Column align={align}>
          <Writeup
            className="items-center text-center"
            size="lg"
            title={title}
            description={description}
          >
            {children}
          </Writeup>
          <Buttons buttons={buttons} />
        </Column>
        <Grid size="lg">
          {projects?.map(({ href, title, image }) => (
            <Link
              className="group flex flex-col gap-3"
              key={uuidv4()}
              href={href}
            >
              <Image
                className="bg-card rounded-lg object-contain transition-opacity group-hover:opacity-75"
                {...image}
              />
              <Heading as="h3">{title}</Heading>
            </Link>
          ))}
        </Grid>
        <Buttons
          className="hidden"
          buttons={buttons}
        />
      </Container>
    </Section>
  )
}

export { Projects1 }
