import { Buttons } from '@/components/buttons'
import { Column } from '@/components/column'
import { Container } from '@/components/container'
import { Grid } from '@/components/grid'
import { Image } from '@/components/image'
import { Section } from '@/components/section'
import { Writeup } from '@/components/writeup'
import * as React from 'react'

interface Props {
  align?: 'start' | 'center' | 'end'
  title?: React.ComponentProps<typeof Writeup>['title']
  description?: React.ComponentProps<typeof Writeup>['description']
  children?: React.ComponentProps<typeof Writeup>['children']
  buttons?: React.ComponentProps<typeof Buttons>['buttons']
  image?: React.ComponentProps<typeof Image>
}

function Content1({ align = 'center', title, description, children, buttons, image }: Props) {
  return (
    <Section className="content content-1">
      <Container>
        <Grid align={align}>
          <Column>
            <Writeup
              title={title}
              description={description}
              children={children}
            />
            <Buttons buttons={buttons} />
          </Column>
          <Image
            className="rounded-lg"
            {...image}
          />
        </Grid>
      </Container>
    </Section>
  )
}

export { Content1 }
