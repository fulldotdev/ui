import * as React from "react"

import { Skeleton } from "@/components/ui/skeleton"

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
      <Example title="Avatar and text">
        <div className="flex items-center gap-4" aria-busy="true">
          <Skeleton className="size-12 shrink-0 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-60" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
      </Example>
      <Example title="Card">
        <div className="flex w-full max-w-xs flex-col gap-3" aria-busy="true">
          <Skeleton className="aspect-video w-full rounded-xl" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </Example>
      <Example title="Form">
        <div className="flex w-full max-w-sm flex-col gap-4" aria-busy="true">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-full" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-full" />
          </div>
          <Skeleton className="h-8 w-24" />
        </div>
      </Example>
    </div>
  )
}
