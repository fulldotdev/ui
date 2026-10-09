import * as React from "react"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

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
  const [volume, setVolume] = React.useState(40)
  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Default">
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Label id="slider-default-label">Brightness</Label>
          <Slider
            aria-labelledby="slider-default-label"
            defaultValue={[50]}
            max={100}
            step={1}
          />
        </div>
      </Example>
      <Example title="Range">
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Label id="slider-range-label">Price range</Label>
          <Slider
            aria-labelledby="slider-range-label"
            defaultValue={[25, 75]}
            max={100}
            step={5}
          />
        </div>
      </Example>
      <Example title="Controlled">
        <div className="flex w-full max-w-sm flex-col gap-3">
          <div className="flex items-center justify-between">
            <Label id="slider-volume-label">Volume</Label>
            <span className="text-sm text-muted-foreground tabular-nums">
              {volume}%
            </span>
          </div>
          <Slider
            aria-labelledby="slider-volume-label"
            value={[volume]}
            onValueChange={(value) =>
              setVolume(Array.isArray(value) ? value[0] : value)
            }
          />
        </div>
      </Example>
      <Example title="Vertical and disabled">
        <div className="flex h-40 items-stretch gap-8">
          <Slider
            aria-label="Bass"
            orientation="vertical"
            defaultValue={[60]}
          />
          <Slider
            aria-label="Treble"
            orientation="vertical"
            defaultValue={[30]}
          />
        </div>
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Label id="slider-disabled-label">Locked setting</Label>
          <Slider
            aria-labelledby="slider-disabled-label"
            defaultValue={[30]}
            disabled
          />
        </div>
      </Example>
    </div>
  )
}
