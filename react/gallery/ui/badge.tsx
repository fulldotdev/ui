import * as React from "react"
import { ArrowUpRightIcon, BadgeCheckIcon, XIcon } from "lucide-react"

import { Badge, badgeVariants } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"

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

function RemovableBadges() {
  const [tags, setTags] = React.useState(["Design", "Development", "Copy"])

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge key={tag} variant="secondary" className="gap-1 pr-1">
          {tag}
          <button
            type="button"
            aria-label={`Remove ${tag}`}
            className="rounded-full hover:bg-foreground/10"
            onClick={() =>
              setTags((current) => current.filter((item) => item !== tag))
            }
          >
            <XIcon className="size-3" />
          </button>
        </Badge>
      ))}
      {tags.length === 0 && (
        <span className="text-sm text-muted-foreground">No tags</span>
      )}
    </div>
  )
}

export default function Demo() {
  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Variants">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="ghost">Ghost</Badge>
        <Badge variant="link">Link</Badge>
      </Example>
      <Example title="With icon or spinner">
        <Badge variant="secondary">
          <BadgeCheckIcon data-icon="inline-start" />
          Verified
        </Badge>
        <Badge variant="outline">
          <Spinner data-icon="inline-start" />
          Syncing
        </Badge>
        <Badge className="h-5 min-w-5 rounded-full px-1 tabular-nums">8</Badge>
        <Badge
          variant="destructive"
          className="h-5 min-w-5 rounded-full px-1 tabular-nums"
        >
          99+
        </Badge>
      </Example>
      <Example title="As a link">
        <Badge render={<a href="#/ui/badge" />}>
          Open docs
          <ArrowUpRightIcon data-icon="inline-end" />
        </Badge>
        <a href="#/ui/button" className={badgeVariants({ variant: "outline" })}>
          Styled link with badgeVariants
        </a>
      </Example>
      <Example title="Removable">
        <RemovableBadges />
      </Example>
    </div>
  )
}
