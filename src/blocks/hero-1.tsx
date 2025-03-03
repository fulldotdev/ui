import { Buttons } from '@/components/buttons'
import { Column } from '@/components/column'
import { Container } from '@/components/container'
import { Image } from '@/components/image'
import { Section } from '@/components/section'
import { Writeup } from '@/components/writeup'
import * as React from 'react'

interface Props {
  level?: React.ComponentProps<typeof Writeup>['level']
  size?: React.ComponentProps<typeof Writeup>['size']
  align?: React.ComponentProps<typeof Writeup>['align']
  title?: React.ComponentProps<typeof Writeup>['title']
  description?: React.ComponentProps<typeof Writeup>['description']
  children?: React.ComponentProps<typeof Writeup>['children']
  buttons?: React.ComponentProps<typeof Buttons>['buttons']
  image?: React.ComponentProps<typeof Image>
}

function Hero1({ level = 1, size = 'xl', align = 'center', title, description, buttons, image, children }: Props) {
  return (
    <Section className="hero hero-1">
      <Container align={align}>
        <Column align={align}>
          <Writeup
            level={level}
            size={size}
            align={align}
            title={title}
            description={description}
          >
            {children}
          </Writeup>
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
