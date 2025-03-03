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
  articles?: {
    href?: React.ComponentProps<typeof Link>['href']
    title?: string
    image?: React.ComponentProps<typeof Image>
  }[]
}

function Articles1({ articles, className, children, ...props }: Props) {
  return (
    <Section
      className={cn('articles articles-1', className)}
      {...props}
    >
      <Container className="flex flex-col items-center gap-16">
        <Writeup
          className="items-center text-center"
          size="lg"
        >
          {children}
        </Writeup>
        <Grid
          length={articles?.length}
          size="lg"
          className="gap-x-8"
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
