import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Price, PriceUnit, PriceValue } from "@/components/ui/price"
import {
  Section,
  SectionContainer,
  SectionTitle,
} from "@/components/ui/section"
import { Separator } from "@/components/ui/separator"

function Products2({
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
      unit: string
    }
  }[]
}) {
  return (
    <Section {...props}>
      <SectionContainer className="flex flex-col gap-8">
        <div className="max-w-2xl">
          <Badge variant="secondary">{badge}</Badge>
          <SectionTitle className="mt-4">{title}</SectionTitle>
        </div>
        <div className="grid gap-3">
          {products.map((item) => (
            <div key={item.title}>
              <Separator />
              <div className="flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col gap-1 md:max-w-lg">
                  <h3 className="text-base font-medium">{item.title}</h3>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <Price>
                  <PriceValue
                    price={item.price.value}
                    compareAt={item.price.compareAt}
                    currency={item.price.currency}
                    locale={locale}
                    discountLabel={discountLabel}
                  />
                  <PriceUnit>{item.price.unit}</PriceUnit>
                </Price>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    </Section>
  )
}

export { Products2 }
