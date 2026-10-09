import * as React from "react"
import { cn } from "cn"

import { buttonVariants } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import {
  Section,
  SectionContainer,
  SectionDescription,
  SectionTitle,
} from "@/components/ui/section"

function Contact1({
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
      <SectionContainer className="flex flex-col items-center gap-6 text-center">
        <div className="flex max-w-2xl flex-col items-center gap-4">
          <SectionTitle>{title}</SectionTitle>
          <SectionDescription className="max-w-2xl">
            {description}
          </SectionDescription>
        </div>
      </SectionContainer>
      <SectionContainer>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contactItems.map((item) => (
            <li
              key={item.title}
              className="flex flex-col gap-3 rounded-xl border p-5"
            >
              <span
                aria-hidden="true"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "icon" }),
                  "text-primary"
                )}
              >
                <Icon name={item.icon} />
              </span>
              <h3 className="text-sm font-medium text-foreground">
                {item.title}
              </h3>
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
            </li>
          ))}
        </ul>
      </SectionContainer>
      {children != null && (
        <SectionContainer>
          <div className="mx-auto w-full max-w-2xl rounded-xl border p-6 sm:p-8">
            {children}
          </div>
        </SectionContainer>
      )}
    </Section>
  )
}

export { Contact1 }
