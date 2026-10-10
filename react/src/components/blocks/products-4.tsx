import * as React from "react"

import { buttonVariants } from "@/components/ui/button"
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

function Products4({
  title,
  description,
  buttons,
  locale,
  discountLabel,
  products,
  ...props
}: React.ComponentProps<"section"> & {
  title: string
  description: string
  buttons: {
    label: string
    href: string
  }[]
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
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <SectionTitle>{title}</SectionTitle>
            <p className="mt-3 text-lg leading-8 text-muted-foreground">
              {description}
            </p>
          </div>
          <div className="flex flex-shrink-0 flex-wrap gap-3">
            {buttons.map(({ href, label }) => (
              <a key={href + label} href={href} className={buttonVariants()}>
                {label}
              </a>
            ))}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.title}>
              <img
                src={product.image.src}
                srcSet={product.image.srcSet}
                alt={product.image.alt}
                width={product.image.width}
                height={product.image.height}
                sizes="(min-width: 80rem) 405px, (min-width: 64rem) 33vw, (min-width: 40rem) 50vw, 100vw"
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

export { Products4 }
