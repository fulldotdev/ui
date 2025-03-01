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
  buttons?: React.ComponentProps<typeof Buttons>['buttons']
  products?: {
    href?: string
    title?: string
    images?: React.ComponentProps<typeof Image>[]
    price?: React.ComponentProps<typeof Price>
  }[]
  children?: React.ReactNode
}

function Products1({ buttons, products, children }: Props) {
  return (
    <Section className="products products-1">
      <Container className="flex flex-col items-start gap-8">
        <Writeup className="flex w-full items-center justify-between gap-8">
          <Writeup size="sm">{children}</Writeup>
          <Buttons
            className="max-lg:hidden"
            size="sm"
            buttons={buttons}
          />
        </Writeup>
        <Grid
          length={products?.length}
          className="gap-4"
        >
          {products?.map(({ href, title, images, price }) => (
            <Link
              className="group flex flex-col gap-3"
              key={uuidv4()}
              href={href}
            >
              <Image
                className="bg-card aspect-square rounded-lg object-contain transition-opacity group-hover:opacity-75"
                {...images?.[0]}
              />
              <Heading as="h3">{title}</Heading>
              <Price {...price} />
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

export { Products1 }
