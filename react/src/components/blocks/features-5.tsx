import * as React from "react"

import { Icon } from "@/components/ui/icon"
import {
  Section,
  SectionContainer,
  SectionDescription,
  SectionTitle,
} from "@/components/ui/section"

function Features5({
  title,
  description,
  features,
  ...props
}: React.ComponentProps<"section"> & {
  title: string
  description: string
  features: {
    title: string
    description: string
    icon: string
  }[]
}) {
  return (
    <Section variant="floating" {...props}>
      <SectionContainer className="flex flex-col items-center gap-6 text-center">
        <div className="flex max-w-2xl flex-col items-center gap-4">
          <SectionTitle>{title}</SectionTitle>
          <SectionDescription className="max-w-2xl">
            {description}
          </SectionDescription>
        </div>
      </SectionContainer>
      <SectionContainer>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <li
              key={feature.title}
              className="flex flex-col items-center gap-4 text-center"
            >
              <div className="flex size-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/5 text-primary">
                <Icon name={feature.icon} className="size-5" />
              </div>
              <h3 className="text-base font-medium text-balance text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-balance text-muted-foreground">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>
      </SectionContainer>
    </Section>
  )
}

export { Features5 }
