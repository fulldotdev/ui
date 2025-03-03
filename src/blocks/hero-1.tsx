import { Buttons } from '@/components/buttons'
import { Column } from '@/components/column'
import { Container } from '@/components/container'
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

function Hero1({ align = 'center', title, description, buttons, image, children }: Props) {
  return (
    <Section className="hero hero-1">
      <Container align={align}>
        <Column align={align}>
          <Writeup
            align={align}
            title={title}
            description={description}
            children={children}
            size="xl"
          />
          <Buttons
            align={align}
            buttons={buttons}
            size="lg"
          />
        </Column>
        <Image
          className="rounded-lg"
          {...image}
        />
      </Container>
    </Section>
  )
}

export { Hero1 as default, Hero1 }
