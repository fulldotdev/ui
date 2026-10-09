import * as React from "react"
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
} from "lucide-react"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

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
  const [align, setAlign] = React.useState<string[]>(["left"])
  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Multiple">
        <ToggleGroup multiple defaultValue={["bold"]} aria-label="Formatting">
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <BoldIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <ItalicIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline">
            <UnderlineIcon />
          </ToggleGroupItem>
        </ToggleGroup>
      </Example>
      <Example title="Single, controlled">
        <div className="flex flex-col gap-2">
          <ToggleGroup
            value={align}
            onValueChange={(value) => setAlign(value)}
            variant="outline"
            aria-label="Text alignment"
          >
            <ToggleGroupItem value="left" aria-label="Align left">
              <AlignLeftIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Align center">
              <AlignCenterIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align right">
              <AlignRightIcon />
            </ToggleGroupItem>
          </ToggleGroup>
          <span className="text-sm text-muted-foreground">
            Alignment: {align[0] ?? "none"}
          </span>
        </div>
      </Example>
      <Example title="Sizes and spacing">
        <ToggleGroup size="sm" variant="outline" spacing={0} aria-label="Small">
          <ToggleGroupItem value="day">Day</ToggleGroupItem>
          <ToggleGroupItem value="week">Week</ToggleGroupItem>
          <ToggleGroupItem value="month">Month</ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup variant="outline" spacing={0} aria-label="Default">
          <ToggleGroupItem value="day">Day</ToggleGroupItem>
          <ToggleGroupItem value="week">Week</ToggleGroupItem>
          <ToggleGroupItem value="month">Month</ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup size="lg" variant="outline" spacing={4} aria-label="Large">
          <ToggleGroupItem value="day">Day</ToggleGroupItem>
          <ToggleGroupItem value="week">Week</ToggleGroupItem>
          <ToggleGroupItem value="month">Month</ToggleGroupItem>
        </ToggleGroup>
      </Example>
      <Example title="Vertical">
        <ToggleGroup
          orientation="vertical"
          variant="outline"
          spacing={0}
          defaultValue={["italic"]}
          aria-label="Vertical formatting"
        >
          <ToggleGroupItem value="bold">
            <BoldIcon />
            Bold
          </ToggleGroupItem>
          <ToggleGroupItem value="italic">
            <ItalicIcon />
            Italic
          </ToggleGroupItem>
          <ToggleGroupItem value="underline">
            <UnderlineIcon />
            Underline
          </ToggleGroupItem>
        </ToggleGroup>
      </Example>
      <Example title="Disabled">
        <ToggleGroup disabled aria-label="Disabled formatting">
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <BoldIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <ItalicIcon />
          </ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup variant="outline" aria-label="One disabled item">
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <BoldIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic" disabled>
            <ItalicIcon />
          </ToggleGroupItem>
        </ToggleGroup>
      </Example>
    </div>
  )
}
