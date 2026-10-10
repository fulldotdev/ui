import * as React from "react"

import {
  Toc,
  TocMenu,
  TocMenuItem,
  TocMenuLink,
  TocTitle,
} from "@/components/ui/toc"

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

const items = [
  { depth: 2, href: "#/ui/toc", label: "Installation", active: true },
  { depth: 2, href: "#/ui/toc", label: "Usage" },
  { depth: 3, href: "#/ui/toc", label: "Props" },
  { depth: 4, href: "#/ui/toc", label: "Defaults" },
  { depth: 2, href: "#/ui/toc", label: "Accessibility" },
]

export default function Demo() {
  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Table of contents">
        <Toc aria-label="On this page" className="w-64">
          <TocTitle>On this page</TocTitle>
          <TocMenu>
            {items.map((item) => (
              <TocMenuItem key={item.label}>
                <TocMenuLink
                  href={item.href}
                  depth={item.depth}
                  active={item.active}
                >
                  {item.label}
                </TocMenuLink>
              </TocMenuItem>
            ))}
          </TocMenu>
        </Toc>
      </Example>
      <Example title="Heading title">
        <Toc aria-labelledby="toc-heading" className="w-64">
          <TocTitle render={<h2 id="toc-heading" />}>Contents</TocTitle>
          <TocMenu>
            <TocMenuItem>
              <TocMenuLink href="#/ui/toc">Overview</TocMenuLink>
            </TocMenuItem>
          </TocMenu>
        </Toc>
      </Example>
    </div>
  )
}
