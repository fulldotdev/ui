import * as React from "react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Price, PriceUnit, PriceValue } from "@/components/ui/price"
import {
  Section,
  SectionContainer,
  SectionTitle,
} from "@/components/ui/section"

function Products1({
  badge,
  title,
  locale,
  discountLabel,
  products,
  ...props
}: React.ComponentProps<"section"> & {
  badge: string
  title: string
  locale?: string
  discountLabel?: string
  products: {
    image: {
      src: string
      srcSet?: string
      alt: string
      width?: number
      height?: number
    }
    title: string
    description: string
    price: {
      value: number
      compareAt?: number
      currency: string
      unit: string
    }
  }[]
}) {
  return (
    <Section {...props}>
      <SectionContainer className="flex flex-col gap-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary">{badge}</Badge>
          <SectionTitle className="mt-4">{title}</SectionTitle>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Card key={product.title}>
              <img
                src={product.image.src}
                srcSet={product.image.srcSet}
                alt={product.image.alt}
                width={product.image.width}
                height={product.image.height}
                sizes="(min-width: 80rem) 302px, (min-width: 64rem) 25vw, (min-width: 40rem) 50vw, 100vw"
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
              <CardHeader>
                <CardTitle>
                  <h3>{product.title}</h3>
                </CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Price>
                  <PriceValue
                    price={product.price.value}
                    compareAt={product.price.compareAt}
                    currency={product.price.currency}
                    locale={locale}
                    discountLabel={discountLabel}
                  />
                  <PriceUnit>{product.price.unit}</PriceUnit>
                </Price>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionContainer>
    </Section>
  )
}

export { Products1 }
