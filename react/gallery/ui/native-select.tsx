import * as React from "react"

import { Label } from "@/components/ui/label"
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select"

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
  const [status, setStatus] = React.useState("todo")

  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Controlled">
        <div className="grid gap-2">
          <Label htmlFor="native-select-status">Status</Label>
          <NativeSelect
            id="native-select-status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <NativeSelectOption value="todo">Todo</NativeSelectOption>
            <NativeSelectOption value="in-progress">
              In progress
            </NativeSelectOption>
            <NativeSelectOption value="done">Done</NativeSelectOption>
            <NativeSelectOption value="cancelled">Cancelled</NativeSelectOption>
          </NativeSelect>
          <p className="text-sm text-muted-foreground">Selected: {status}</p>
        </div>
      </Example>

      <Example title="Groups">
        <div className="grid gap-2">
          <Label htmlFor="native-select-department">Department</Label>
          <NativeSelect id="native-select-department" defaultValue="">
            <NativeSelectOption value="" disabled>
              Select a department
            </NativeSelectOption>
            <NativeSelectOptGroup label="Engineering">
              <NativeSelectOption value="frontend">Frontend</NativeSelectOption>
              <NativeSelectOption value="backend">Backend</NativeSelectOption>
            </NativeSelectOptGroup>
            <NativeSelectOptGroup label="Sales">
              <NativeSelectOption value="sales-rep">
                Sales rep
              </NativeSelectOption>
              <NativeSelectOption value="account-manager">
                Account manager
              </NativeSelectOption>
            </NativeSelectOptGroup>
          </NativeSelect>
        </div>
      </Example>

      <Example title="Sizes">
        <NativeSelect aria-label="Default size" defaultValue="default">
          <NativeSelectOption value="default">Default</NativeSelectOption>
        </NativeSelect>
        <NativeSelect size="sm" aria-label="Small size" defaultValue="small">
          <NativeSelectOption value="small">Small</NativeSelectOption>
        </NativeSelect>
      </Example>

      <Example title="Disabled and invalid">
        <NativeSelect aria-label="Disabled select" disabled defaultValue="a">
          <NativeSelectOption value="a">Disabled</NativeSelectOption>
        </NativeSelect>
        <NativeSelect aria-label="Invalid select" aria-invalid defaultValue="">
          <NativeSelectOption value="">Pick a role</NativeSelectOption>
          <NativeSelectOption value="admin">Admin</NativeSelectOption>
          <NativeSelectOption value="member">Member</NativeSelectOption>
        </NativeSelect>
      </Example>
    </div>
  )
}
