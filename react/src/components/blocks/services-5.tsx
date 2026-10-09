import * as React from "react"
import { ArrowRightIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Icon } from "@/components/ui/icon"
import {
  Section,
  SectionContainer,
  SectionTitle,
} from "@/components/ui/section"

function Services5({
  badge,
  title,
  description,
  services,
  ...props
}: React.ComponentProps<"section"> & {
  badge: string
  title: string
  description: string
  services: {
    icon: string
    title: string
    description: string
    link?: {
      label: string
      href: string
    }
  }[]
}) {
  return (
    <Section {...props}>
      <SectionContainer className="flex flex-col gap-12">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary">{badge}</Badge>
          <SectionTitle className="mt-4">{title}</SectionTitle>
          <p className="mt-4 text-base leading-relaxed text-balance text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="grid gap-px overflow-hidden rounded-xl bg-border ring-1 ring-foreground/10 ring-inset sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="relative flex flex-col gap-4 bg-background p-7"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15 ring-inset">
                <Icon name={service.icon} className="size-5" />
              </div>
              <h3 className="text-base font-medium tracking-tight">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              {service.link && (
                <a
                  href={service.link.href}
                  className="mt-auto inline-flex w-fit items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  {service.link.label}
                  <ArrowRightIcon className="size-3.5" />
                </a>
              )}
            </div>
          ))}
        </div>
      </SectionContainer>
    </Section>
  )
}

export { Services5 }
