import * as React from "react"

import { ThemeProvider, ThemeToggle } from "@/components/ui/theme-toggle"

function Example({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
      <div className="flex flex-wrap items-start gap-4">{children}</div>
    </section>
  )
}

export default function Demo() {
  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Toggle">
        <ThemeToggle />
        <ThemeToggle variant="outline" size="icon" label="Switch theme" />
      </Example>
      <Example title="Provider">
        <p className="max-w-prose text-sm text-muted-foreground">
          The gallery wraps every page in ThemeProvider, which sets the dark
          class on the html element and remembers the choice.
        </p>
        <ThemeProvider>
          <ThemeToggle
            variant="secondary"
            label="Toggle theme inside a nested provider"
          />
        </ThemeProvider>
      </Example>
    </div>
  )
}
