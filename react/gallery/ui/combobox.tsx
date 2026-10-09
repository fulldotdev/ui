import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox"

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

const frameworks = ["Astro", "Next.js", "Nuxt", "Remix", "SvelteKit"]

const timezones = [
  { value: "Europe", items: ["Amsterdam", "Berlin", "Lisbon", "London"] },
  { value: "America", items: ["Chicago", "New York", "Toronto"] },
  { value: "Asia", items: ["Singapore", "Tokyo"] },
]

const countries = [
  { code: "nl", label: "Netherlands" },
  { code: "be", label: "Belgium" },
  { code: "de", label: "Germany" },
  { code: "fr", label: "France" },
]

function FrameworkItems() {
  return (
    <ComboboxContent>
      <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
      <ComboboxList>
        {(item: string) => (
          <ComboboxItem key={item} value={item}>
            {item}
          </ComboboxItem>
        )}
      </ComboboxList>
    </ComboboxContent>
  )
}

function MultipleExample() {
  const anchor = useComboboxAnchor()

  return (
    <Combobox
      multiple
      autoHighlight
      items={frameworks}
      defaultValue={["Astro"]}
    >
      <ComboboxChips ref={anchor} className="w-80">
        <ComboboxValue>
          {(values: string[]) => (
            <React.Fragment>
              {values.map((value) => (
                <ComboboxChip key={value}>{value}</ComboboxChip>
              ))}
              <ComboboxChipsInput
                placeholder="Add framework"
                aria-label="Frameworks"
              />
            </React.Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

export default function Demo() {
  const [framework, setFramework] = React.useState<string | null>("Astro")

  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Basic">
        <Combobox items={frameworks}>
          <ComboboxInput
            placeholder="Select a framework"
            aria-label="Framework"
          />
          <FrameworkItems />
        </Combobox>
      </Example>
      <Example title="Controlled with clear button">
        <div className="flex flex-col gap-2">
          <Combobox
            items={frameworks}
            value={framework}
            onValueChange={setFramework}
          >
            <ComboboxInput
              placeholder="Select a framework"
              aria-label="Framework"
              showClear
            />
            <FrameworkItems />
          </Combobox>
          <p className="text-sm text-muted-foreground">
            Selected: {framework ?? "nothing"}
          </p>
        </div>
      </Example>
      <Example title="Disabled, disabled items and invalid">
        <Combobox items={frameworks} disabled>
          <ComboboxInput
            placeholder="Disabled"
            aria-label="Disabled framework"
            disabled
          />
          <FrameworkItems />
        </Combobox>
        <Combobox items={frameworks}>
          <ComboboxInput
            placeholder="Some items disabled"
            aria-label="Framework with disabled items"
          />
          <ComboboxContent>
            <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
            <ComboboxList>
              {(item: string) => (
                <ComboboxItem
                  key={item}
                  value={item}
                  disabled={item === "Nuxt" || item === "Remix"}
                >
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        <Combobox items={frameworks}>
          <ComboboxInput
            placeholder="Invalid"
            aria-label="Invalid framework"
            aria-invalid
          />
          <FrameworkItems />
        </Combobox>
      </Example>
      <Example title="Groups and separators">
        <Combobox items={timezones}>
          <ComboboxInput placeholder="Select a city" aria-label="City" />
          <ComboboxContent>
            <ComboboxEmpty>No cities found.</ComboboxEmpty>
            <ComboboxList>
              {(group: (typeof timezones)[number], index: number) => (
                <ComboboxGroup key={group.value} items={group.items}>
                  <ComboboxLabel>{group.value}</ComboboxLabel>
                  <ComboboxCollection>
                    {(item: string) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxCollection>
                  {index < timezones.length - 1 && <ComboboxSeparator />}
                </ComboboxGroup>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Example>
      <Example title="Multiple with chips">
        <MultipleExample />
      </Example>
      <Example title="Trigger with search in popup">
        <Combobox items={countries} defaultValue={countries[0]}>
          <ComboboxTrigger
            render={
              <Button
                variant="outline"
                className="w-64 justify-between font-normal"
              />
            }
          >
            <ComboboxValue />
          </ComboboxTrigger>
          <ComboboxContent>
            <ComboboxInput
              showTrigger={false}
              placeholder="Search countries"
              aria-label="Search countries"
            />
            <ComboboxEmpty>No countries found.</ComboboxEmpty>
            <ComboboxList>
              {(item: (typeof countries)[number]) => (
                <ComboboxItem key={item.code} value={item}>
                  {item.label}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Example>
    </div>
  )
}
