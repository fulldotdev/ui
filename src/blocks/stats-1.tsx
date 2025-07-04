import type { BlockProps } from "@/lib/types"
import {
  Section,
  SectionContainer,
  SectionContent,
} from "@/components/ui/section"
import { Tile, TileDescription, TileTitle } from "@/components/ui/tile"

export default function ({ children, items }: BlockProps) {
  return (
    <Section>
      <SectionContainer>
        {children && <SectionContent size="4xl">{children}</SectionContent>}
        <div className="mt-16 flex flex-wrap justify-center gap-16">
          {items?.map(({ title, description }) => (
            <Tile
              key={title}
              panel={false}
              className="flex max-w-md min-w-2xs grow-1 basis-xs flex-col"
            >
              <TileTitle className="text-3xl">{title}</TileTitle>
              {description && (
                <TileDescription className="mt-2">
                  {description}
                </TileDescription>
              )}
            </Tile>
          ))}
        </div>
      </SectionContainer>
    </Section>
  )
}
