import * as React from "react"

import { Rating } from "@/components/ui/rating"

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
      <Example title="Values">
        <Rating />
        <Rating value={4.5} />
        <Rating value={3.2} />
        <Rating value={0} />
      </Example>
      <Example title="Label and size">
        <Rating value={4.8} aria-label="Rated 4.8 out of 5 by 120 customers" />
        <Rating value={4} className="text-2xl" />
      </Example>
    </div>
  )
}
