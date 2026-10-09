import * as React from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

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
      <Example title="With a checkbox">
        <div className="flex items-center gap-2">
          <Checkbox id="label-terms" />
          <Label htmlFor="label-terms">Accept terms and conditions</Label>
        </div>
      </Example>

      <Example title="With inputs">
        <div className="grid w-full max-w-sm gap-2">
          <Label htmlFor="label-email">Email</Label>
          <Input id="label-email" type="email" placeholder="you@example.com" />
        </div>
        <div className="grid w-full max-w-sm gap-2">
          <Label htmlFor="label-message">Message</Label>
          <Textarea id="label-message" placeholder="Type your message" />
        </div>
      </Example>

      <Example title="Disabled">
        <div className="group grid w-full max-w-sm gap-2" data-disabled="true">
          <Label htmlFor="label-disabled">Company</Label>
          <Input id="label-disabled" placeholder="Not editable" disabled />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="label-disabled-checkbox" disabled />
          <Label htmlFor="label-disabled-checkbox">Subscribe to updates</Label>
        </div>
      </Example>
    </div>
  )
}
