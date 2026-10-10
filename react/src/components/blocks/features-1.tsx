import * as React from "react"
import { ArrowRightIcon } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import {
  Section,
  SectionContainer,
  SectionDescription,
  SectionTitle,
} from "@/components/ui/section"

function Features1({
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
    icon: string
    link?: {
      label: string
      href: string
    }
  }[]
}) {
  return (
    <Section {...props}>
      <SectionContainer className="flex flex-col items-center gap-6 text-center">
        <div className="flex max-w-2xl flex-col items-center gap-4">
          <SectionTitle>{title}</SectionTitle>
          <SectionDescription className="max-w-2xl">
            {description}
          </SectionDescription>
        </div>
        {buttons.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3">
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
        )}
      </SectionContainer>
      <SectionContainer>
        <ul className="grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <li
              key={feature.title}
              className="flex flex-col gap-4 rounded-xl border p-6"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon name={feature.icon} className="size-5" />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-base font-medium text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
              {feature.link && (
                <a
                  href={feature.link.href}
                  className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  {feature.link.label}
                  <ArrowRightIcon className="size-3.5" />
                </a>
              )}
            </li>
          ))}
        </ul>
      </SectionContainer>
    </Section>
  )
}

export { Features1 }
