import * as React from "react"
import { SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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
      <Example title="Keys">
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>⌥</Kbd>
        <Kbd>Ctrl</Kbd>
        <Kbd>Enter</Kbd>
      </Example>

      <Example title="Group">
        <p className="text-sm text-muted-foreground">
          Use{" "}
          <KbdGroup>
            <Kbd>Ctrl + B</Kbd>
            <Kbd>Ctrl + K</Kbd>
          </KbdGroup>{" "}
          to open the command palette.
        </p>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <span>+</span>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Example>

      <Example title="In a button and tooltip">
        <Button variant="outline">
          Accept <Kbd>⏎</Kbd>
        </Button>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>
            Save
          </TooltipTrigger>
          <TooltipContent>
            Save changes{" "}
            <KbdGroup>
              <Kbd>⌘</Kbd>
              <Kbd>S</Kbd>
            </KbdGroup>
          </TooltipContent>
        </Tooltip>
      </Example>

      <Example title="In an input group">
        <InputGroup className="max-w-xs">
          <InputGroupInput placeholder="Search" aria-label="Search" />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </InputGroupAddon>
        </InputGroup>
      </Example>
    </div>
  )
}
