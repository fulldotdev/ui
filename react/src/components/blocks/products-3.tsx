import * as React from "react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Price, PriceValue } from "@/components/ui/price"
import {
  Section,
  SectionContainer,
  SectionTitle,
} from "@/components/ui/section"

function Products3({
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
    title: string
    description: string
    price: {
      value: number
      compareAt?: number
      currency: string
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.title} className="text-center">
              <CardHeader>
                <Price className="justify-center">
                  <PriceValue
                    className="text-3xl font-semibold"
                    price={product.price.value}
                    compareAt={product.price.compareAt}
                    currency={product.price.currency}
                    locale={locale}
                    discountLabel={discountLabel}
                  />
                </Price>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <CardTitle>
                  <h3>{product.title}</h3>
                </CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionContainer>
    </Section>
  )
}

export { Products3 }
