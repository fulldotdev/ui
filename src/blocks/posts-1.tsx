import * as React from "react"

import type { BlockProps } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import {
  Section,
  SectionContainer,
  SectionContent,
} from "@/components/ui/section"
import {
  Tile,
  TileContent,
  TileDescription,
  TileTagline,
  TileTitle,
} from "@/components/ui/tile"
import { Toggle } from "@/components/ui/toggle"

export default function ({ children, items }: BlockProps) {
  // Collect all tags from items, flatten, and deduplicate
  const allTags = items?.flatMap(({ tags }) => tags)
  const uniqueTags = [...new Set(allTags)].filter((tag) => tag !== undefined)

  // State for the currently active tag filter (null = show all)
  const [activeTags, setActiveTags] = React.useState<string[]>([])

  // Handler for toggling tag filters
  const handleTagToggle = (tag: string) => (pressed: boolean) => {
    setActiveTags(
      pressed ? [...activeTags, tag] : activeTags.filter((t) => t !== tag)
    )
  }

  // Filter items by active tag, or show all if none selected
  const filteredPosts = React.useMemo(() => {
    if (activeTags.length === 0) return items
    return items?.filter((item) =>
      item.tags?.some((tag) => activeTags.includes(tag))
    )
  }, [items, activeTags])

  return (
    <Section>
      <SectionContainer className="max-w-screen-md lg:px-12">
        {children && (
          <SectionContent className="text-center" size="4xl">
            {children}
          </SectionContent>
        )}
        <div className="flex flex-col gap-4 not-first:mt-16">
          <div className="mb-8 flex flex-row flex-wrap justify-center gap-2">
            {uniqueTags?.map((tag) => (
              <Toggle
                key={tag}
                size="sm"
                variant="outline"
                onPressedChange={handleTagToggle(tag)}
              >
                {tag}
              </Toggle>
            ))}
          </div>
          <div className="mx-auto flex max-w-screen-md flex-col gap-4">
            {filteredPosts?.map(
              ({ href, title, description, published, tags }) => (
                <Tile href={href} key={href} panel={false}>
                  <TileContent>
                    {tags?.map((tag) => (
                      <Badge variant="secondary" key={tag}>
                        {tag}
                      </Badge>
                    ))}
                    <TileTagline>
                      {published?.toLocaleDateString("nl-NL")}
                    </TileTagline>
                    <TileTitle>{title}</TileTitle>
                    <TileDescription>{description}</TileDescription>
                  </TileContent>
                </Tile>
              )
            )}
          </div>
        </div>
      </SectionContainer>
    </Section>
  )
}
