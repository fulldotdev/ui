import * as React from "react"

import type { BlockSchema } from "@/schemas/block"
import { cn } from "@/lib/utils"
import { Button } from "@/components/button"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Gallery } from "@/components/gallery"
import { List } from "@/components/list"
import { Price } from "@/components/price"
import { Prose } from "@/components/prose"
import { Section } from "@/components/section"
import { ShopifyProduct } from "@/components/shopify-product"
import { Split } from "@/components/split"
import { Title } from "@/components/title"

function Product1({
  level = 1,
  title,
  description,
  list,
  images,
  price,
  id,
  variants,
  children,
  className,
  ...props
}: BlockSchema & React.ComponentProps<typeof Section>) {
  return (
    <Section className={cn("product product-1 pt-0", className)} {...props}>
      <Container className="max-sm:px-0">
        <Split className="items-start">
          <Gallery
            className="ring-muted sm:mt-12 sm:rounded-md sm:ring"
            images={images}
          />
          <div className="top-header max-sm:px-4 md:mt-12 lg:sticky">
            <Title size="4xl" level={level}>
              {title}
            </Title>
            <Description className="text-muted-foreground text-sm not-first:mt-4">
              {description}
            </Description>
            <List className="not-first:mt-6" items={list} />
            {id ? (
              <ShopifyProduct id={id} variants={variants} />
            ) : (
              <>
                <Price
                  className="text-lg font-medium not-first:mt-6"
                  {...price}
                />
                <Button className="not-first:mt-6" size="lg" href="/contact/">
                  Plaats aanvraag
                </Button>
              </>
            )}
          </div>
          <Prose className="max-sm:px-4">{children}</Prose>
        </Split>
      </Container>
    </Section>
  )
}

export { Product1 }
