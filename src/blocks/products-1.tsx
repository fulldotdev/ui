import { Buttons } from '@/components/buttons'
import { Container } from '@/components/container'
import { Grid } from '@/components/grid'
import { Heading } from '@/components/heading'
import { Image } from '@/components/image'
import { Link } from '@/components/link'
import { Price } from '@/components/price'
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
  products?: {
    href?: string
    title?: string
    images?: React.ComponentProps<typeof Image>[]
    price?: React.ComponentProps<typeof Price>
  }[]
}

function Products1({ align = 'center', title, description, children, buttons, products }: Props) {
  return (
    <Section className="products products-1">
      <Container align={align}>
        <Writeup
          align={align}
          title={title}
          description={description}
          children={children}
        />
        <Grid>
          {products?.map(({ href, title, images, price }) => (
            <Link
              className="group flex flex-col"
              key={uuidv4()}
              href={href}
            >
              <Image
                className="bg-card aspect-square rounded-md object-contain transition-opacity group-hover:opacity-75 bg-muted p-4 ring-1 ring-muted"
                {...images?.[0]}
              />
              <Heading
                as="h3"
                className="text-sm mt-5 mb-1"
              >
                {title}
              </Heading>
              <Price
                className="text-sm text-muted-foreground"
                {...price}
              />
            </Link>
          ))}
        </Grid>
        <Buttons
          className="max-lg:hidden"
          buttons={buttons}
        />
      </Container>
    </Section>
  )
}

export { Products1 }
