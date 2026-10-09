import * as React from "react"

import { Icon } from "@/components/ui/icon"

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

const names = [
  "rocket",
  "heart",
  "star",
  "check",
  "trash",
  "message-circle",
  "home",
]
const links = [
  "https://github.com/fulldotdev/ui",
  "https://x.com/fulldotdev",
  "https://www.youtube.com/@fulldev",
  "https://wa.me/31600000000",
  "mailto:contact@full.dev",
  "tel:+31600000000",
  "https://www.linkedin.com/company/fulldev",
  "https://example.com",
]

export default function Demo() {
  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="By name">
        {names.map((name) => (
          <Icon key={name} name={name} className="size-6" />
        ))}
      </Example>
      <Example title="From a link">
        {links.map((href) => (
          <a
            key={href}
            href={href}
            aria-label={href}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon href={href} className="size-6" />
          </a>
        ))}
      </Example>
      <Example title="Prefixed sets and labelled icons">
        <Icon name="simple:github" className="size-6" />
        <Icon name="lucide:github" className="size-6" />
        <Icon name="rocket" aria-label="Launch" role="img" className="size-6" />
        <Icon name="does-not-exist" className="size-6" />
      </Example>
    </div>
  )
}
