import { Button } from '@/components/button'
import { Column } from '@/components/column'
import { Container } from '@/components/container'
import { Gallery } from '@/components/gallery'
import { Image } from '@/components/image'
import { Price } from '@/components/price'
import { Prose } from '@/components/prose'
import { Section } from '@/components/section'
import { ShopifyProduct } from '@/components/shopify-product'
import { Split } from '@/components/split'
import { Writeup } from '@/components/writeup'
import { cn } from '@/lib/utils'
import * as React from 'react'

interface Props extends React.ComponentProps<typeof Section> {
  id?: string
  variants?: any
  level?: React.ComponentProps<typeof Writeup>['level']
  size?: React.ComponentProps<typeof Writeup>['size']
  align?: React.ComponentProps<typeof Writeup>['align']
  title?: React.ComponentProps<typeof Writeup>['title']
  description?: React.ComponentProps<typeof Writeup>['description']
  price?: React.ComponentProps<typeof Price>
  images?: React.ComponentProps<typeof Image>[]
  children?: React.ReactNode
}

function Product1({
  id,
  level,
  size,
  align,
  title,
  description,
  images,
  price,
  variants,
  children,
  className,
  ...props
}: Props) {
  return (
    <Section
      className={cn('product product-1 pt-0 sm:pt-8', className)}
      {...props}
    >
      <Container className="max-sm:px-0">
        <Split className="items-start">
          <Gallery
            className="sm:rounded-md sm:ring ring-muted"
            images={images}
          />
          <Column className="lg:sticky top-22 max-sm:px-4 gap-8">
            <Writeup
              level={level}
              size={size}
              align={align}
              title={title}
              description={description}
            />
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
                  href="/contact/"
                >
                  Plaats aanvraag
                </Button>
              </>
            )}
          </Column>
          <Prose className="max-sm:px-4">{children}</Prose>
        </Split>
      </Container>
    </Section>
  )
}

export { Product1 }
