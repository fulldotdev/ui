import { Box } from '@/components/box'
import { Container } from '@/components/container'
import { Gallery } from '@/components/gallery'
import { Heading } from '@/components/heading'
import { Image } from '@/components/image'
import { Paragraph } from '@/components/paragraph'
import { Price } from '@/components/price'
import { Prose } from '@/components/prose'
import { Section } from '@/components/section'
import { ShopifyProduct } from '@/components/shopify-product'
import { Split } from '@/components/split'
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
    <Section className="pt-4 lg:pt-16">
      <Container>
        <Split>
          <Box className="flex flex-col gap-16">
            <Gallery images={images} />
            <Prose className="max-lg:hidden">{children}</Prose>
          </Box>
          <Box className="flex flex-col gap-8 lg:pl-8">
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
          </Box>
          <Prose className="lg:hidden">{children}</Prose>
        </Split>
      </Container>
    </Section>
  )
}

export { Product1 }
