import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

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
      <Example title="Sizes">
        <div className="flex items-center gap-6">
          <Spinner className="size-3" />
          <Spinner />
          <Spinner className="size-6" />
          <Spinner className="size-8" />
        </div>
      </Example>
      <Example title="Color">
        <div className="flex items-center gap-6">
          <Spinner className="text-muted-foreground" />
          <Spinner className="text-primary" />
          <Spinner className="text-destructive" />
        </div>
      </Example>
      <Example title="In a button">
        <Button disabled>
          <Spinner data-icon="inline-start" />
          Saving
        </Button>
        <Button variant="outline" disabled>
          <Spinner data-icon="inline-start" />
          Please wait
        </Button>
        <Button variant="secondary" size="icon" disabled aria-label="Loading">
          <Spinner />
        </Button>
      </Example>
      <Example title="In a badge">
        <Badge>
          <Spinner data-icon="inline-start" />
          Syncing
        </Badge>
        <Badge variant="secondary">
          <Spinner data-icon="inline-start" />
          Updating
        </Badge>
      </Example>
    </div>
  )
}
