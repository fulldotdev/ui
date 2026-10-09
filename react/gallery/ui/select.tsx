import * as React from "react"

import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const fruits = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
]

const vegetables = [
  { label: "Carrot", value: "carrot" },
  { label: "Broccoli", value: "broccoli" },
  { label: "Spinach", value: "spinach" },
]

const timezones = [
  "Pacific/Honolulu",
  "America/Anchorage",
  "America/Los_Angeles",
  "America/Denver",
  "America/Chicago",
  "America/New_York",
  "America/Sao_Paulo",
  "Atlantic/Azores",
  "Europe/London",
  "Europe/Amsterdam",
  "Europe/Athens",
  "Europe/Moscow",
  "Asia/Dubai",
  "Asia/Karachi",
  "Asia/Kolkata",
  "Asia/Bangkok",
  "Asia/Shanghai",
  "Asia/Tokyo",
  "Australia/Sydney",
  "Pacific/Auckland",
].map((zone) => ({ label: zone.replace("_", " "), value: zone }))

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
  const [fruit, setFruit] = React.useState<string | null>("banana")
  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Default">
        <div className="flex flex-col gap-2">
          <Label htmlFor="select-fruit">Fruit</Label>
          <Select items={fruits}>
            <SelectTrigger id="select-fruit" className="w-48">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {fruits.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </Example>
      <Example title="Groups, labels and separator">
        <div className="flex flex-col gap-2">
          <Label htmlFor="select-produce">Produce</Label>
          <Select items={[...fruits, ...vegetables]}>
            <SelectTrigger id="select-produce" className="w-48">
              <SelectValue placeholder="Select produce" />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                {fruits.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Vegetables</SelectLabel>
                {vegetables.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </Example>
      <Example title="Sizes">
        <Select items={fruits} defaultValue="apple">
          <SelectTrigger size="sm" aria-label="Small fruit select">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {fruits.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select items={fruits} defaultValue="apple">
          <SelectTrigger aria-label="Default fruit select">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {fruits.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Example>
      <Example title="Controlled">
        <div className="flex flex-col gap-2">
          <Label htmlFor="select-controlled">Favorite fruit</Label>
          <Select items={fruits} value={fruit} onValueChange={setFruit}>
            <SelectTrigger id="select-controlled" className="w-48">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              {fruits.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            Value: {fruit ?? "none"}
          </p>
        </div>
      </Example>
      <Example title="Disabled">
        <Select items={fruits} disabled>
          <SelectTrigger aria-label="Disabled select" className="w-48">
            <SelectValue placeholder="Not available" />
          </SelectTrigger>
          <SelectContent>
            {fruits.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select items={fruits}>
          <SelectTrigger
            aria-label="Select with a disabled item"
            className="w-48"
          >
            <SelectValue placeholder="Grapes are sold out" />
          </SelectTrigger>
          <SelectContent>
            {fruits.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                disabled={item.value === "grapes"}
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Example>
      <Example title="Scrollable">
        <div className="flex flex-col gap-2">
          <Label htmlFor="select-timezone">Time zone</Label>
          <Select items={timezones} defaultValue="Europe/Amsterdam">
            <SelectTrigger id="select-timezone" className="w-60">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-64">
              {timezones.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Example>
    </div>
  )
}
