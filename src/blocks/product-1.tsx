import * as React from "react"
import type { BlockSchema } from "@/schemas/block"

import { cn } from "@/lib/utils"
import { Button } from "@/components/button"
import { Column } from "@/components/column"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Gallery } from "@/components/gallery"
import { Price } from "@/components/price"
import { Prose } from "@/components/prose"
import { Section } from "@/components/section"
import { ShopifyProduct } from "@/components/shopify-product"
import { Split } from "@/components/split"
import { Title } from "@/components/title"

function Product1({
  level = 1,
  align,
  title,
  description,
  images,
  price,
  id,
  variants,
  children,
  className,
  ...props
}: BlockSchema & React.ComponentProps<typeof Section>) {
  console.log(title, id)
  return (
    <Section className={cn("product product-1 pt-0", className)} {...props}>
      <Container className="max-sm:px-0">
        <Split className="items-start">
          <Gallery
            className="ring-muted sm:mt-12 sm:rounded-md sm:ring"
            images={images}
          />
          <Column className="top-header gap-8 max-sm:px-4 md:mt-12 lg:sticky">
            <Title size="4xl" level={level} align={align} text={title} />
            <Description
              className="not-first:mt-4"
              align={align}
              text={description}
            />
            {id ? (
              <ShopifyProduct id={id} variants={variants} />
            ) : (
              <>
                <Price className="mt-4 text-lg font-medium" {...price} />
                <Button className="mt-4" size="lg" href="/contact/">
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
