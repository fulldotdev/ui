import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
  const [value, setValue] = React.useState("Ada")

  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Basic">
        <Input className="w-72" placeholder="Email" aria-label="Email" />
      </Example>
      <Example title="With label">
        <div className="flex w-72 flex-col gap-2">
          <Label htmlFor="input-name">Name</Label>
          <Input id="input-name" placeholder="Your name" />
        </div>
      </Example>
      <Example title="Controlled">
        <div className="flex w-72 flex-col gap-2">
          <Label htmlFor="input-controlled">Display name</Label>
          <Input
            id="input-controlled"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
          <p className="text-sm text-muted-foreground">
            Hello, {value || "stranger"}.
          </p>
        </div>
      </Example>
      <Example title="Types">
        <div className="flex w-72 flex-col gap-2">
          <Label htmlFor="input-password">Password</Label>
          <Input id="input-password" type="password" defaultValue="secret" />
        </div>
        <div className="flex w-72 flex-col gap-2">
          <Label htmlFor="input-number">Quantity</Label>
          <Input id="input-number" type="number" defaultValue={2} min={1} />
        </div>
        <div className="flex w-72 flex-col gap-2">
          <Label htmlFor="input-date">Date</Label>
          <Input id="input-date" type="date" />
        </div>
        <div className="flex w-72 flex-col gap-2">
          <Label htmlFor="input-file">Picture</Label>
          <Input id="input-file" type="file" />
        </div>
      </Example>
      <Example title="States">
        <div className="flex w-72 flex-col gap-2">
          <Label htmlFor="input-disabled">Disabled</Label>
          <Input id="input-disabled" disabled placeholder="Not editable" />
        </div>
        <div className="flex w-72 flex-col gap-2">
          <Label htmlFor="input-invalid">Invalid</Label>
          <Input id="input-invalid" aria-invalid defaultValue="not-an-email" />
        </div>
        <div className="flex w-72 flex-col gap-2">
          <Label htmlFor="input-readonly">Read only</Label>
          <Input id="input-readonly" readOnly defaultValue="ORD-4189" />
        </div>
      </Example>
      <Example title="With button">
        <form
          className="flex w-80 items-center gap-2"
          onSubmit={(event) => event.preventDefault()}
        >
          <Input type="email" placeholder="Email" aria-label="Email" />
          <Button type="submit">Subscribe</Button>
        </form>
      </Example>
    </div>
  )
}
