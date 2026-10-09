import * as React from "react"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

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
  const [checked, setChecked] = React.useState(true)
  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Default">
        <div className="flex items-center gap-2">
          <Switch id="switch-airplane" />
          <Label htmlFor="switch-airplane">Airplane mode</Label>
        </div>
      </Example>
      <Example title="Sizes">
        <div className="flex items-center gap-2">
          <Switch id="switch-small" size="sm" defaultChecked />
          <Label htmlFor="switch-small">Small</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="switch-default" defaultChecked />
          <Label htmlFor="switch-default">Default</Label>
        </div>
      </Example>
      <Example title="Disabled and invalid">
        <div className="flex items-center gap-2">
          <Switch id="switch-disabled" disabled />
          <Label htmlFor="switch-disabled">Disabled</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="switch-disabled-on" disabled defaultChecked />
          <Label htmlFor="switch-disabled-on">Disabled and on</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="switch-invalid" aria-invalid="true" />
          <Label htmlFor="switch-invalid">Accept the terms</Label>
        </div>
      </Example>
      <Example title="Controlled with description">
        <div className="flex w-full max-w-sm items-start justify-between gap-4 rounded-lg border p-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="switch-marketing">Marketing emails</Label>
            <p className="text-sm text-muted-foreground">
              {checked
                ? "You receive news about products and features."
                : "You only receive account emails."}
            </p>
          </div>
          <Switch
            id="switch-marketing"
            checked={checked}
            onCheckedChange={setChecked}
          />
        </div>
      </Example>
    </div>
  )
}
