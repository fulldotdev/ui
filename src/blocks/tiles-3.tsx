import type { BlockProps } from "@/lib/types"
import { Link } from "@/components/ui/link"
import {
  Section,
  SectionContainer,
  SectionContent,
  SectionFooter,
  SectionSplit,
} from "@/components/ui/section"
import {
  Tile,
  TileContent,
  TileDescription,
  TileImage,
  TileTitle,
} from "@/components/ui/tile"

export default function ({ children, links, items }: BlockProps) {
  return (
    <Section>
      <SectionContainer>
        <SectionSplit className="items-start">
          <div className="top-24 flex flex-col items-start md:sticky">
            {children && <SectionContent>{children}</SectionContent>}
          </div>
          <div className="flex flex-col gap-4">
            {items?.map(({ title, description, image }, i) => (
              <Tile className="break-inside-avoid" key={i}>
                <TileImage {...image} />
                <TileContent>
                  <TileTitle>{title}</TileTitle>
                  {description && (
                    <TileDescription>{description}</TileDescription>
                  )}
                </TileContent>
              </Tile>
            ))}
          </div>
        </SectionSplit>
      </SectionContainer>
    </Section>
  )
}
