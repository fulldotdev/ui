import type { BlockProps } from "@/lib/types"
import {
  Container,
  Section,
  SectionContent,
  SectionGrid,
} from "@/components/elements/section"
import {
  Tile,
  TileContent,
  TileImage,
  TileTitle,
} from "@/components/elements/tile"

export default function ({ children, items }: BlockProps) {
  return (
    <Section>
      <Container>
        {children && <SectionContent>{children}</SectionContent>}
        <SectionGrid className="not-first:mt-12">
          {items?.map(({ title, image, href }, i) => (
            <Tile key={i} href={href}>
              <TileImage className="aspect-4/3 object-cover" {...image} />
              <TileContent>
                <TileTitle>{title}</TileTitle>
              </TileContent>
            </Tile>
          ))}
        </SectionGrid>
      </Container>
    </Section>
  )
}
