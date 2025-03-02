import { Container } from '@/components/container'
import { Gallery } from '@/components/gallery'
import { Heading } from '@/components/heading'
import { Image } from '@/components/image'
import { Paragraph } from '@/components/paragraph'
import { Price } from '@/components/price'
import { Prose } from '@/components/prose'
import { Section } from '@/components/section'
import { ShopifyProduct } from '@/components/shopify-product'
import { Button } from '@/components/ui/button'
import { Writeup } from '@/components/writeup'
import * as React from 'react'

interface Props {
  id?: string
  variants?: any
  title?: string
  description?: string
  price?: React.ComponentProps<typeof Price>
  images?: React.ComponentProps<typeof Image>[]
  children?: React.ReactNode
}

function Product1({ id, title, description, images, price, variants, children }: Props) {
  return (
    <Section className="pt-0 sm:pt-8">
      <Container className="max-lg:px-0 max-lg:max-w-screen-sm lg:grid-cols-2 grid gap-8 items-start">
        <Gallery
          className="sm:rounded-md sm:ring ring-muted"
          images={images}
        />
        <Container className="flex flex-col gap-8 lg:px-0 xl:pl-8 lg:sticky top-22">
          <Writeup size="sm">
            <Heading as="h1">{title}</Heading>
            <Paragraph>{description}</Paragraph>
          </Writeup>
          {id ? (
            <ShopifyProduct
              id={id}
              variants={variants}
            />
          ) : (
            <>
              <Price
                className="mt-4 text-lg font-medium"
                {...price}
              />
              <Button
                className="mt-4"
                size="lg"
                asChild
              >
                <a href="/contact/">Plaats aanvraag</a>
              </Button>
            </>
          )}
        </Container>
        <Prose className="max-lg:px-4">{children}</Prose>
      </Container>
    </Section>
  )
}

export { Product1 }
