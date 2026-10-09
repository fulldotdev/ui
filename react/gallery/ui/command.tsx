import * as React from "react"
import {
  CalculatorIcon,
  CalendarIcon,
  CreditCardIcon,
  SettingsIcon,
  SmileIcon,
  UserIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Kbd } from "@/components/ui/kbd"

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

function CommandItems({ onSelect }: { onSelect?: (value: string) => void }) {
  return (
    <>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Suggestions">
        <CommandItem onSelect={onSelect}>
          <CalendarIcon />
          <span>Calendar</span>
        </CommandItem>
        <CommandItem onSelect={onSelect}>
          <SmileIcon />
          <span>Search emoji</span>
        </CommandItem>
        <CommandItem disabled onSelect={onSelect}>
          <CalculatorIcon />
          <span>Calculator</span>
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Settings">
        <CommandItem onSelect={onSelect}>
          <UserIcon />
          <span>Profile</span>
          <CommandShortcut>⌘P</CommandShortcut>
        </CommandItem>
        <CommandItem onSelect={onSelect}>
          <CreditCardIcon />
          <span>Billing</span>
          <CommandShortcut>⌘B</CommandShortcut>
        </CommandItem>
        <CommandItem onSelect={onSelect}>
          <SettingsIcon />
          <span>Settings</span>
          <CommandShortcut>⌘S</CommandShortcut>
        </CommandItem>
      </CommandGroup>
    </>
  )
}

const languages = ["English", "Nederlands", "Deutsch", "Français"]

export default function Demo() {
  const [open, setOpen] = React.useState(false)
  const [last, setLast] = React.useState<string>()
  const [language, setLanguage] = React.useState("English")

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "j" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Inline">
        <Command className="max-w-sm rounded-lg border">
          <CommandInput placeholder="Type a command or search" />
          <CommandList>
            <CommandItems />
          </CommandList>
        </Command>
      </Example>
      <Example title="Selected item">
        <Command className="max-w-sm rounded-lg border">
          <CommandInput placeholder="Search languages" />
          <CommandList>
            <CommandEmpty>No languages found.</CommandEmpty>
            <CommandGroup heading="Language">
              {languages.map((item) => (
                <CommandItem
                  key={item}
                  value={item}
                  data-checked={item === language}
                  onSelect={setLanguage}
                >
                  {item}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </Example>
      <Example title="Dialog">
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            className="w-fit"
            onClick={() => setOpen(true)}
          >
            Open command palette <Kbd>⌘J</Kbd>
          </Button>
          <p className="text-sm text-muted-foreground">
            Last command: {last ?? "none"}
          </p>
          <CommandDialog open={open} onOpenChange={setOpen}>
            <Command>
              <CommandInput placeholder="Type a command or search" />
              <CommandList>
                <CommandItems
                  onSelect={(value) => {
                    setLast(value)
                    setOpen(false)
                  }}
                />
              </CommandList>
            </Command>
          </CommandDialog>
        </div>
      </Example>
    </div>
  )
}
