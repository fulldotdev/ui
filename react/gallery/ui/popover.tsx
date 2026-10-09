import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

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
      <Example title="With a form">
        <Popover>
          <PopoverTrigger render={<Button variant="outline" />}>
            Open popover
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <PopoverHeader>
              <PopoverTitle>Dimensions</PopoverTitle>
              <PopoverDescription>
                Set the dimensions for the layer.
              </PopoverDescription>
            </PopoverHeader>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="popover-width">Width</Label>
                <Input
                  id="popover-width"
                  defaultValue="100%"
                  className="col-span-2"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="popover-height">Height</Label>
                <Input
                  id="popover-height"
                  defaultValue="25px"
                  className="col-span-2"
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </Example>

      <Example title="Sides and alignment">
        {(["top", "right", "bottom", "left"] as const).map((side) => (
          <Popover key={side}>
            <PopoverTrigger render={<Button variant="outline" />}>
              {side}
            </PopoverTrigger>
            <PopoverContent side={side} className="w-48">
              <p className="text-sm">Opens on the {side} side.</p>
            </PopoverContent>
          </Popover>
        ))}
        <Popover>
          <PopoverTrigger render={<Button variant="outline" />}>
            Align end
          </PopoverTrigger>
          <PopoverContent align="end" className="w-48">
            <p className="text-sm">Aligned to the end of the trigger.</p>
          </PopoverContent>
        </Popover>
      </Example>

      <Example title="Controlled">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger render={<Button variant="outline" />}>
            {open ? "Close" : "Open"} controlled popover
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>Share this page</PopoverTitle>
              <PopoverDescription>
                Anyone with the link can view it.
              </PopoverDescription>
            </PopoverHeader>
            <Button size="sm" onClick={() => setOpen(false)}>
              Done
            </Button>
          </PopoverContent>
        </Popover>
        <p className="text-sm text-muted-foreground">
          {open ? "Open" : "Closed"}
        </p>
      </Example>
    </div>
  )
}
