import * as React from "react"

import { Separator } from "@/components/ui/separator"

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
      <Example title="Horizontal and vertical">
        <div className="w-full max-w-sm text-sm">
          <div className="flex flex-col gap-1">
            <h3 className="leading-none font-medium">Fulldev UI</h3>
            <p className="text-muted-foreground">
              Components and blocks for client websites.
            </p>
          </div>
          <Separator className="my-4" />
          <div className="flex h-5 items-center gap-4">
            <span>Blog</span>
            <Separator orientation="vertical" />
            <span>Docs</span>
            <Separator orientation="vertical" />
            <span>Source</span>
          </div>
        </div>
      </Example>
      <Example title="Between list items">
        <ul className="flex w-full max-w-sm flex-col text-sm">
          {["Design", "Build", "Launch"].map((step, index) => (
            <li key={step} className="flex flex-col">
              {index > 0 && <Separator className="my-2" />}
              {step}
            </li>
          ))}
        </ul>
      </Example>
    </div>
  )
}
