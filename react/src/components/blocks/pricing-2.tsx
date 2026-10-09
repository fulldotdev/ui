import * as React from "react"
import { cn } from "cn"
import { CheckIcon } from "lucide-react"

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

function Pricing2({
  title,
  description,
  locale,
  discountLabel,
  plans,
  ...props
}: React.ComponentProps<"section"> & {
  title: string
  description: string
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
      <SectionContainer className="flex flex-col gap-8">
        <div className="mx-auto max-w-2xl text-center">
          <SectionTitle>{title}</SectionTitle>
          <SectionDescription className="mt-4">
            {description}
          </SectionDescription>
        </div>
        <div className="mx-auto grid w-full justify-center gap-6 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(16rem,18rem))]">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className="flex flex-col border-none shadow-none"
            >
              <CardHeader>
                <CardTitle>
                  <h3>{plan.name}</h3>
                </CardTitle>
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

export { Pricing2 }
