import type { BlockProps } from "@/lib/types"
import {
  Container,
  Section,
  SectionContent,
  SectionSplit,
} from "@/components/elements/section"
import {
  Tile,
  TileContent,
  TileDescription,
  TileImage,
  TileTitle,
} from "@/components/elements/tile"

export default function ({ children, items }: BlockProps) {
  return (
    <Section>
      <Container>
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
      </Container>
    </Section>
  )
}
