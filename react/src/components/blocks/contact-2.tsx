import * as React from "react"
import { cn } from "cn"

import { buttonVariants } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import {
  Section,
  SectionContainer,
  SectionTitle,
} from "@/components/ui/section"

function Contact2({
  title,
  description,
  contactItems,
  children,
  ...props
}: React.ComponentProps<"section"> & {
  title: string
  description: string
  contactItems: {
    icon: string
    title: string
    description: string
    href?: string
  }[]
}) {
  return (
    <Section {...props}>
      <SectionContainer className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <SectionTitle>{title}</SectionTitle>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
          {children != null && (
            <div className="rounded-xl border p-6">{children}</div>
          )}
        </div>
        <ul className="flex flex-col gap-3">
          {contactItems.map((item) => (
            <li key={item.title} className="flex gap-4 rounded-xl border p-4">
              <span
                aria-hidden="true"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "icon" }),
                  "shrink-0 text-primary"
                )}
              >
                <Icon name={item.icon} />
              </span>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-foreground">
                  {item.title}
                </p>
                {item.href != null ? (
                  <a
                    href={item.href}
                    className="text-sm leading-relaxed wrap-anywhere text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  >
                    {item.description}
                  </a>
                ) : (
                  <p className="text-sm leading-relaxed wrap-anywhere text-muted-foreground">
                    {item.description}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </SectionContainer>
    </Section>
  )
}

export { Contact2 }
