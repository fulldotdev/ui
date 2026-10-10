import * as React from "react"
import { cn } from "cn"

import { buttonVariants } from "@/components/ui/button"
import {
  Section,
  SectionContainer,
  SectionDescription,
  SectionTitle,
} from "@/components/ui/section"

function Cta8({
  className,
  title,
  description,
  buttons,
  ...props
}: React.ComponentProps<"section"> & {
  title: string
  description: string
  buttons: {
    label: string
    href: string
  }[]
}) {
  return (
    <Section
      variant="floating"
      className={cn("border-primary/20 shadow-none", className)}
      {...props}
    >
      <SectionContainer className="relative flex flex-col items-center gap-8 before:absolute before:top-full before:left-1/2 before:-z-10 before:h-[200%] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-to-b before:from-primary/20 before:to-transparent before:blur-3xl">
        <div className="flex max-w-2xl flex-col items-center gap-5 text-center">
          <SectionTitle className="leading-[1.1]">{title}</SectionTitle>
          <SectionDescription>{description}</SectionDescription>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {buttons.map(({ href, label }, index) => (
            <a
              key={href + label}
              href={href}
              className={buttonVariants({
                size: "lg",
                variant: index === 0 ? "default" : "outline",
              })}
            >
              {label}
            </a>
          ))}
        </div>
      </SectionContainer>
    </Section>
  )
}

export { Cta8 }
