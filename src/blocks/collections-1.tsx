import { Buttons } from '@/components/buttons'
import { Column } from '@/components/column'
import { Container } from '@/components/container'
import { Grid } from '@/components/grid'
import { Image } from '@/components/image'
import { Link } from '@/components/link'
import { Section } from '@/components/section'
import { Writeup } from '@/components/writeup'
import * as React from 'react'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  align?: 'start' | 'center' | 'end'
  title?: React.ComponentProps<typeof Writeup>['title']
  description?: React.ComponentProps<typeof Writeup>['description']
  children?: React.ComponentProps<typeof Writeup>['children']
  buttons?: React.ComponentProps<typeof Buttons>['buttons']
  collections?: {
    href?: React.ComponentProps<typeof Link>['href']
    image?: React.ComponentProps<typeof Image>
    title?: string
  }[]
}

function Collections1({ align, title, description, children, buttons, collections }: Props) {
  return (
    <Section className="collections collections-1">
      <Container align={align}>
        <Column align={align}>
          <Writeup
            align={align}
            title={title}
            description={description}
          >
            {children}
          </Writeup>
          <Buttons
            className="max-lg:hidden"
            align={align}
            buttons={buttons}
          />
        </Column>
        <Grid>
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
              <h3 className="font-medium">{title}</h3>
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
