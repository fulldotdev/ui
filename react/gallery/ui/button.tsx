import * as React from "react"
import {
  ArrowRightIcon,
  ArrowUpIcon,
  ArrowUpRightIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
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

function SaveButton() {
  const [saving, setSaving] = React.useState(false)

  return (
    <Button
      disabled={saving}
      onClick={() => {
        setSaving(true)
        window.setTimeout(() => setSaving(false), 1500)
      }}
    >
      {saving && <Spinner data-icon="inline-start" />}
      {saving ? "Saving" : "Save changes"}
    </Button>
  )
}

export default function Demo() {
  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Variants">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </Example>
      <Example title="Sizes">
        <div className="flex flex-wrap items-center gap-4">
          <Button size="xs" variant="outline">
            Extra small
          </Button>
          <Button size="sm" variant="outline">
            Small
          </Button>
          <Button variant="outline">Default</Button>
          <Button size="lg" variant="outline">
            Large
          </Button>
        </div>
      </Example>
      <Example title="Icon sizes">
        <div className="flex flex-wrap items-center gap-4">
          <Button size="icon-xs" variant="outline" aria-label="Submit">
            <ArrowUpIcon />
          </Button>
          <Button size="icon-sm" variant="outline" aria-label="Submit">
            <ArrowUpIcon />
          </Button>
          <Button size="icon" variant="outline" aria-label="Submit">
            <ArrowUpIcon />
          </Button>
          <Button size="icon-lg" variant="outline" aria-label="Submit">
            <ArrowUpIcon />
          </Button>
        </div>
      </Example>
      <Example title="With icons">
        <Button variant="outline">
          <PlusIcon data-icon="inline-start" />
          New page
        </Button>
        <Button variant="secondary">
          Continue
          <ArrowRightIcon data-icon="inline-end" />
        </Button>
        <Button variant="destructive">
          <Trash2Icon data-icon="inline-start" />
          Delete
        </Button>
      </Example>
      <Example title="Disabled and loading">
        <Button disabled>Disabled</Button>
        <Button variant="outline" disabled>
          <Spinner data-icon="inline-start" />
          Loading
        </Button>
        <SaveButton />
      </Example>
      <Example title="As a link">
        <Button nativeButton={false} render={<a href="#/ui/button" />}>
          Rendered as a link
          <ArrowUpRightIcon data-icon="inline-end" />
        </Button>
        <a href="#/ui/badge" className={buttonVariants({ variant: "outline" })}>
          Styled with buttonVariants
        </a>
      </Example>
    </div>
  )
}
