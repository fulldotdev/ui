import * as React from "react"
import { ArrowRightIcon } from "lucide-react"

import { Section, SectionContainer } from "@/components/ui/section"

function Links2({
  title,
  description,
  links,
  ...props
}: React.ComponentProps<"section"> & {
  title: string
  description: string
  links: {
    href: string
    title: string
    description: string
  }[]
}) {
  return (
    <Section {...props}>
      <SectionContainer className="flex flex-col gap-10">
        <div className="flex min-w-0 flex-col gap-4 border-b pb-8">
          <h2 className="text-2xl font-semibold tracking-tight text-balance text-foreground sm:text-3xl">
            {title}
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group/link rounded-lg bg-muted/40 px-4 py-4 transition-colors hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <span className="flex min-w-0 items-center justify-between gap-3">
                <span className="text-sm font-medium">{item.title}</span>
                <ArrowRightIcon className="size-3.5 shrink-0 text-muted-foreground transition-transform group-hover/link:translate-x-0.5" />
              </span>
              <span className="mt-1 block text-sm leading-6 text-muted-foreground">
                {item.description}
              </span>
            </a>
          ))}
        </div>
      </SectionContainer>
    </Section>
  )
}

export { Links2 }
