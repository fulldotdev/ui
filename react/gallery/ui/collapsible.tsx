import * as React from "react"
import { ChevronsUpDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

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

const repositories = ["@base-ui/react", "lucide-react", "tailwindcss"]

export default function Demo() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Basic">
        <Collapsible className="flex w-80 flex-col gap-2">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-medium">Order #4189</p>
            <CollapsibleTrigger
              render={<Button variant="ghost" size="icon-sm" />}
            >
              <ChevronsUpDownIcon />
              <span className="sr-only">Toggle details</span>
            </CollapsibleTrigger>
          </div>
          <div className="rounded-md border px-4 py-2 text-sm">
            Status: shipped
          </div>
          <CollapsibleContent className="flex flex-col gap-2">
            <div className="rounded-md border px-4 py-2 text-sm">
              Carrier: PostNL
            </div>
            <div className="rounded-md border px-4 py-2 text-sm">
              Expected: Friday
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Example>
      <Example title="Controlled">
        <Collapsible
          open={open}
          onOpenChange={setOpen}
          className="flex w-80 flex-col gap-2"
        >
          <CollapsibleTrigger render={<Button variant="outline" />}>
            {open ? "Hide" : "Show"} {repositories.length} dependencies
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-col gap-2">
            {repositories.map((name) => (
              <div
                key={name}
                className="rounded-md border px-4 py-2 font-mono text-sm"
              >
                {name}
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </Example>
      <Example title="Open by default and disabled">
        <Collapsible defaultOpen className="flex w-80 flex-col gap-2">
          <CollapsibleTrigger render={<Button variant="outline" />}>
            Toggle notes
          </CollapsibleTrigger>
          <CollapsibleContent className="rounded-md border px-4 py-2 text-sm">
            These notes start open.
          </CollapsibleContent>
        </Collapsible>
        <Collapsible disabled className="flex w-80 flex-col gap-2">
          <CollapsibleTrigger render={<Button variant="outline" />}>
            Locked section
          </CollapsibleTrigger>
          <CollapsibleContent className="rounded-md border px-4 py-2 text-sm">
            This content cannot be opened.
          </CollapsibleContent>
        </Collapsible>
      </Example>
    </div>
  )
}
