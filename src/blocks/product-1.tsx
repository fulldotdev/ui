import { Box } from '@/components/box'
import { CartForm } from '@/components/cart-form'
import { Container } from '@/components/container'
import { Gallery } from '@/components/gallery'
import { Heading } from '@/components/heading'
import { Image } from '@/components/image'
import { Paragraph } from '@/components/paragraph'
import { Price } from '@/components/price'
import { Prose } from '@/components/prose'
import { Section } from '@/components/section'
import { Split } from '@/components/split'
import { Button } from '@/components/ui/button'
import { Writeup } from '@/components/writeup'
import * as React from 'react'

interface Props {
  gid?: string
  title?: string
  description?: string
  price?: React.ComponentProps<typeof Price>
  images?: React.ComponentProps<typeof Image>[]
  options?: any
  variants?: any
  children?: React.ReactNode
}

function Product1({ gid, title, description, images, price, options, variants, children }: Props) {
  return (
    <Section className="pt-4 lg:pt-16">
      <Container>
        <Split>
          <Box className="flex flex-col gap-16">
            <Gallery>
              {images?.map((image) => (
                <Image
                  className="bg-card aspect-square h-full w-full object-contain"
                  src={image.src}
                  alt={image.alt}
                />
              ))}
            </Gallery>
            <Prose className="max-lg:hidden">{children}</Prose>
          </Box>
          <Box className="flex flex-col gap-8 lg:pl-8">
            <Writeup size="sm">
              <Heading as="h1">{title}</Heading>
              <Paragraph>{description}</Paragraph>
            </Writeup>
            {gid ? (
              <CartForm
                options={options}
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
