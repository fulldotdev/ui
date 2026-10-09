import * as React from "react"
import { InfoIcon, SaveIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const sides = ["top", "right", "bottom", "left"] as const

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
  const [open, setOpen] = React.useState(false)
  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Default">
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>
            Hover
          </TooltipTrigger>
          <TooltipContent>
            <p>Add to library</p>
          </TooltipContent>
        </Tooltip>
      </Example>
      <Example title="Sides">
        {sides.map((side) => (
          <Tooltip key={side}>
            <TooltipTrigger render={<Button variant="outline" />}>
              {side}
            </TooltipTrigger>
            <TooltipContent side={side}>Shown on the {side}</TooltipContent>
          </Tooltip>
        ))}
      </Example>
      <Example title="Icon button with a shortcut">
        <Tooltip>
          <TooltipTrigger
            render={<Button variant="outline" size="icon" aria-label="Save" />}
          >
            <SaveIcon />
          </TooltipTrigger>
          <TooltipContent className="flex items-center gap-2">
            Save <Kbd>S</Kbd>
          </TooltipContent>
        </Tooltip>
      </Example>
      <Example title="Disabled button">
        <Tooltip>
          <TooltipTrigger
            render={<span className="inline-flex" tabIndex={0} />}
          >
            <Button variant="outline" disabled>
              Publish
            </Button>
          </TooltipTrigger>
          <TooltipContent>Add a title before publishing</TooltipContent>
        </Tooltip>
      </Example>
      <Example title="Controlled">
        <Tooltip open={open} onOpenChange={setOpen}>
          <TooltipTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                aria-label="More information"
              />
            }
          >
            <InfoIcon />
          </TooltipTrigger>
          <TooltipContent>Also opens from the button next to it</TooltipContent>
        </Tooltip>
        <Button variant="outline" onClick={() => setOpen((value) => !value)}>
          {open ? "Hide tooltip" : "Show tooltip"}
        </Button>
      </Example>
      <Example title="Provider with a delay">
        <TooltipProvider delay={600}>
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" />}>
              Slow
            </TooltipTrigger>
            <TooltipContent>Opens after 600 ms</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" />}>
              Also slow
            </TooltipTrigger>
            <TooltipContent>Shares the provider delay</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Example>
    </div>
  )
}
