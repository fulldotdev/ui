import * as React from "react"
import { cn } from "cn"
import { CheckIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Price, PriceUnit, PriceValue } from "@/components/ui/price"
import {
  Section,
  SectionContainer,
  SectionDescription,
  SectionTitle,
} from "@/components/ui/section"
import { Separator } from "@/components/ui/separator"

function Pricing1({
  title,
  description,
  featuredLabel,
  locale,
  discountLabel,
  plans,
  ...props
}: React.ComponentProps<"section"> & {
  title: string
  description: string
  featuredLabel: string
  locale?: string
  discountLabel?: string
  plans: {
    name: string
    description: string
    price: {
      value: number
      compareAt?: number
      currency: string
      unit: string
    }
    featured?: boolean
    features: string[]
    button: {
      label: string
      href: string
    }
  }[]
}) {
  return (
    <Section {...props}>
      <SectionContainer className="flex flex-col items-center gap-8 text-center">
        <div className="flex max-w-2xl flex-col items-center gap-4">
          <SectionTitle>{title}</SectionTitle>
          <SectionDescription>{description}</SectionDescription>
        </div>
      </SectionContainer>
      <SectionContainer>
        <div className="mx-auto grid w-full justify-center gap-6 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(16rem,18rem))]">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "flex flex-col",
                plan.featured && "ring-2 ring-primary"
              )}
            >
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CardTitle>
                    <h3>{plan.name}</h3>
                  </CardTitle>
                  {plan.featured && <Badge>{featuredLabel}</Badge>}
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <Price>
                  <PriceValue
                    price={plan.price.value}
                    compareAt={plan.price.compareAt}
                    currency={plan.price.currency}
                    locale={locale}
                    discountLabel={discountLabel}
                  />
                  <PriceUnit>{plan.price.unit}</PriceUnit>
                </Price>
                <Separator />
                <ul className="flex flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm"
                    >
                      <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <a
                  href={plan.button.href}
                  className={cn(
                    buttonVariants({
                      variant: plan.featured ? "default" : "outline",
                    }),
                    "w-full"
                  )}
                >
                  {plan.button.label}
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </SectionContainer>
    </Section>
  )
}

export { Pricing1 }
