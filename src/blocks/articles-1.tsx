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
  articles?: {
    href?: React.ComponentProps<typeof Link>['href']
    title?: string
    image?: React.ComponentProps<typeof Image>
  }[]
}

function Articles1({ level, size, align, title, description, articles, className, children, ...props }: Props) {
  return (
    <Section
      className={cn('articles articles-1', className)}
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
        <Grid
          size="lg"
          className="mt-8 first:mt-0 gap-y-8 gap-x-4"
        >
          {articles?.map(({ href, title, image }) => (
            <Link
              className="group flex flex-col gap-3"
              key={uuidv4()}
              href={href}
            >
              <Image
                className="bg-card rounded-lg object-contain transition-opacity group-hover:opacity-75"
                {...image}
              />
              <h3 className="text-md">{title}</h3>
            </Link>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}

export { Articles1 }
