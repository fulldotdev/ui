import { Buttons } from '@/components/buttons'
import { Column } from '@/components/column'
import { Container } from '@/components/container'
import { Grid } from '@/components/grid'
import { Image } from '@/components/image'
import { Section } from '@/components/section'
import { Writeup } from '@/components/writeup'
import { cn } from '@/lib/utils'
import * as React from 'react'

interface Props extends React.ComponentProps<typeof Section> {
  level?: React.ComponentProps<typeof Writeup>['level']
  size?: React.ComponentProps<typeof Writeup>['size']
  align?: React.ComponentProps<typeof Writeup>['align']
  title?: React.ComponentProps<typeof Writeup>['title']
  description?: React.ComponentProps<typeof Writeup>['description']
  buttons?: React.ComponentProps<typeof Buttons>['buttons']
  image?: React.ComponentProps<typeof Image>
}
function Hero2({
  level = 1,
  size = 'xl',
  align,
  title,
  description,
  buttons,
  image,
  children,
  className,
  ...props
}: Props) {
  return (
    <Section
      className={cn('content content-1', className)}
      {...props}
    >
      <Container>
        <Grid
          className="gap-16"
          align={align}
        >
          <Column className="gap-8">
            <Writeup
              level={level}
              size={size}
              title={title}
              description={description}
            >
              {children}
            </Writeup>
            <Buttons
              size={size}
              buttons={buttons}
            />
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

export { Hero2 }
