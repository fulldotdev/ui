import * as React from "react"

import { buttonVariants } from "@/components/ui/button"
import {
  Section,
  SectionContainer,
  SectionTitle,
} from "@/components/ui/section"
import { Separator } from "@/components/ui/separator"

function Features6({
  title,
  description,
  buttons,
  features,
  ...props
}: React.ComponentProps<"section"> & {
  title: string
  description: string
  buttons: {
    label: string
    href: string
  }[]
  features: {
    title: string
    description: string
  }[]
}) {
  return (
    <Section {...props}>
      <SectionContainer>
        <div className="flex max-w-2xl flex-col gap-4">
          <SectionTitle>{title}</SectionTitle>
          <p className="text-base leading-relaxed text-balance text-muted-foreground">
            {description}
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
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
      <SectionContainer>
        <ul className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <li key={feature.title}>
              <Separator />
              <div className="pt-6">
                <h3 className="text-lg font-medium text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </SectionContainer>
    </Section>
  )
}

export { Features6 }
