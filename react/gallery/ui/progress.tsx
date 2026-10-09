import * as React from "react"
import { Progress as ProgressPrimitive } from "@base-ui/react/progress"

import { Button } from "@/components/ui/button"
import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "@/components/ui/progress"

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
  const [value, setValue] = React.useState(40)

  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Values">
        <div className="flex w-full max-w-sm flex-col gap-4">
          <Progress value={0} aria-label="Empty" />
          <Progress value={33} aria-label="One third" />
          <Progress value={100} aria-label="Complete" />
        </div>
      </Example>

      <Example title="Label and value">
        <Progress value={56} className="w-full max-w-sm">
          <ProgressLabel>Upload progress</ProgressLabel>
          <ProgressValue className="ml-auto" />
        </Progress>
      </Example>

      <Example title="Controlled">
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Progress value={value}>
            <ProgressLabel>Storage used</ProgressLabel>
            <ProgressValue className="ml-auto" />
          </Progress>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setValue((current) => Math.max(0, current - 10))}
            >
              Decrease
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setValue((current) => Math.min(100, current + 10))}
            >
              Increase
            </Button>
          </div>
        </div>
      </Example>

      <Example title="Indeterminate">
        <Progress value={null} className="w-full max-w-sm">
          <ProgressLabel>Connecting</ProgressLabel>
        </Progress>
      </Example>

      <Example title="Custom track and indicator">
        <ProgressPrimitive.Root
          value={72}
          className="flex w-full max-w-sm flex-col gap-2"
        >
          <ProgressLabel>Profile complete</ProgressLabel>
          <ProgressTrack className="h-3">
            <ProgressIndicator className="bg-emerald-500" />
          </ProgressTrack>
        </ProgressPrimitive.Root>
      </Example>
    </div>
  )
}
