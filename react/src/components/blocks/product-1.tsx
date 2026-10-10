import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Price, PriceUnit, PriceValue } from "@/components/ui/price"
import { Section, SectionContainer } from "@/components/ui/section"

function Product1({
  badge,
  title,
  description,
  image,
  price,
  locale,
  discountLabel,
  note,
  buttons,
  ...props
}: React.ComponentProps<"section"> & {
  badge: string
  title: string
  description: string
  image: {
    src: string
    srcSet?: string
    alt: string
    width?: number
    height?: number
  }
  price: {
    value: number
    compareAt?: number
    currency: string
    unit: string
  }
  locale?: string
  discountLabel?: string
  note: string
  buttons: {
    label: string
    href: string
  }[]
}) {
  return (
    <Section {...props}>
      <SectionContainer className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <img
          src={image.src}
          srcSet={image.srcSet}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(min-width: 80rem) 608px, (min-width: 64rem) 50vw, 100vw"
          loading="eager"
          fetchPriority="high"
          className="aspect-[16/11] w-full rounded-lg object-cover"
        />
        <div className="flex flex-col gap-5">
          <Badge variant="secondary" className="w-fit">
            {badge}
          </Badge>
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            {title}
          </h1>
          <p className="text-lg leading-8 text-muted-foreground">
            {description}
          </p>
          <Price>
            <PriceValue
              price={price.value}
              compareAt={price.compareAt}
              currency={price.currency}
              locale={locale}
              discountLabel={discountLabel}
            />
            <PriceUnit>{price.unit}</PriceUnit>
          </Price>
          <p className="border-y py-4 text-sm leading-7">{note}</p>
          <div className="flex flex-wrap gap-3">
            {buttons.map(({ href, label }, index) => (
              <a
                key={href + label}
                href={href}
                className={buttonVariants({
                  variant: index === 0 ? "default" : "outline",
                })}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </SectionContainer>
    </Section>
  )
}

export { Product1 }
