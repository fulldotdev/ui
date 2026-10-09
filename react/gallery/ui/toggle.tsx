import * as React from "react"
import { BoldIcon, BookmarkIcon, ItalicIcon, UnderlineIcon } from "lucide-react"

import { Toggle, toggleVariants } from "@/components/ui/toggle"

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
  const [bookmarked, setBookmarked] = React.useState(false)
  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Default">
        <Toggle aria-label="Toggle bold">
          <BoldIcon />
        </Toggle>
        <Toggle aria-label="Toggle italic" defaultPressed>
          <ItalicIcon />
        </Toggle>
      </Example>
      <Example title="Outline">
        <Toggle variant="outline" aria-label="Toggle underline">
          <UnderlineIcon />
        </Toggle>
        <Toggle variant="outline" defaultPressed>
          <ItalicIcon />
          Italic
        </Toggle>
      </Example>
      <Example title="Sizes">
        <div className="flex items-center gap-2">
          <Toggle size="sm" variant="outline" aria-label="Small">
            <BoldIcon />
          </Toggle>
          <Toggle size="default" variant="outline" aria-label="Default">
            <BoldIcon />
          </Toggle>
          <Toggle size="lg" variant="outline" aria-label="Large">
            <BoldIcon />
          </Toggle>
        </div>
      </Example>
      <Example title="Disabled">
        <Toggle aria-label="Toggle bold" disabled>
          <BoldIcon />
        </Toggle>
        <Toggle variant="outline" disabled defaultPressed>
          Pressed and disabled
        </Toggle>
      </Example>
      <Example title="Controlled">
        <div className="flex items-center gap-3">
          <Toggle
            variant="outline"
            pressed={bookmarked}
            onPressedChange={setBookmarked}
          >
            <BookmarkIcon />
            Bookmark
          </Toggle>
          <span className="text-sm text-muted-foreground">
            {bookmarked ? "Saved" : "Not saved"}
          </span>
        </div>
      </Example>
      <Example title="Toggle styling on a link">
        <a
          href="#/ui/toggle-group"
          className={toggleVariants({ variant: "outline", size: "sm" })}
        >
          Toggle group
        </a>
      </Example>
    </div>
  )
}
