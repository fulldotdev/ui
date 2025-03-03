import { Abstract } from '@/components/abstract'
import { Buttons } from '@/components/buttons'
import { Container } from '@/components/container'
import { Grid } from '@/components/grid'
import { Image } from '@/components/image'
import { Link } from '@/components/link'
import { Section } from '@/components/section'
import { Writeup } from '@/components/writeup'
import { cn } from '@/lib/utils'
import * as React from 'react'
import { v4 as uuidv4 } from 'uuid'

interface Props extends React.ComponentProps<typeof Section> {
  level?: React.ComponentProps<typeof Writeup>['level']
  size?: React.ComponentProps<typeof Writeup>['size']
  align?: React.ComponentProps<typeof Writeup>['align']
  title?: React.ComponentProps<typeof Writeup>['title']
  description?: React.ComponentProps<typeof Writeup>['description']
  buttons?: React.ComponentProps<typeof Buttons>['buttons']
  pages?: {
    href?: string
    title?: string
    description?: string
    image?: React.ComponentProps<typeof Image>
  }[]
  children?: React.ReactNode
}

function Pages1({ level, size, align, title, description, buttons, pages, children, className, ...props }: Props) {
  return (
    <Section
      className={cn('pages pages-1', className)}
      {...props}
    >
      <Container
        className="gap-8"
        align={align}
      >
        <Writeup
          level={level}
          size={size}
          align={align}
          title={title}
          description={description}
        >
          {children}
        </Writeup>
        <Buttons buttons={buttons} />
        <Grid className="mt-8 first:mt-0 gap-y-8 gap-x-4">
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
              <Abstract
                level={level}
                size={size}
                title={title}
                description={description}
              />
            </Link>
          ))}
        </Grid>
        <Buttons buttons={buttons} />
      </Container>
    </Section>
  )
}

export { Pages1 }
