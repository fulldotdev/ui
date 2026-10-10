import * as React from "react"

import { Button } from "@/components/ui/button"
import { DirectionProvider, useDirection } from "@/components/ui/direction"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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

function CurrentDirection() {
  const direction = useDirection()
  return (
    <p className="text-sm">
      Direction from context: <span className="font-mono">{direction}</span>
    </p>
  )
}

function DirectionCard({ direction }: { direction: "ltr" | "rtl" }) {
  return (
    <DirectionProvider direction={direction}>
      <div
        dir={direction}
        className="flex w-72 flex-col gap-3 rounded-lg border p-4"
      >
        <CurrentDirection />
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="outline" className="w-fit" />}
          >
            {direction === "rtl" ? "القائمة" : "Menu"}
          </DropdownMenuTrigger>
          <DropdownMenuContent dir={direction}>
            <DropdownMenuItem>
              {direction === "rtl" ? "الملف الشخصي" : "Profile"}
            </DropdownMenuItem>
            <DropdownMenuItem>
              {direction === "rtl" ? "الإعدادات" : "Settings"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </DirectionProvider>
  )
}

export default function Demo() {
  const [direction, setDirection] = React.useState<"ltr" | "rtl">("rtl")

  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Default (no provider)">
        <div className="w-72 rounded-lg border p-4">
          <CurrentDirection />
        </div>
      </Example>
      <Example title="Left to right and right to left">
        <DirectionCard direction="ltr" />
        <DirectionCard direction="rtl" />
      </Example>
      <Example title="Switching direction">
        <div className="flex flex-col gap-3">
          <Button
            variant="outline"
            className="w-fit"
            onClick={() =>
              setDirection((current) => (current === "rtl" ? "ltr" : "rtl"))
            }
          >
            Switch to {direction === "rtl" ? "LTR" : "RTL"}
          </Button>
          <DirectionCard direction={direction} />
        </div>
      </Example>
    </div>
  )
}
