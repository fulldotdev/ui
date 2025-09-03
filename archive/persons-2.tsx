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
  TileTagline,
  TileTitle,
} from "@/components/elements/tile"

export default function ({ children, items }: BlockProps) {
  return (
    <Section>
      <Container className="flex flex-col items-start">
        {children && <SectionContent>{children}</SectionContent>}
        <SectionGrid className="not-first:mt-12">
          {items?.map(({ href, image, title, tagline }, i) => (
            <Tile key={i} href={href} panel={false}>
              <TileImage
                className="aspect-square object-cover"
                alt={`${title} ${tagline}`}
                {...image}
              />
              <TileContent>
                {tagline && <TileTagline>{tagline}</TileTagline>}
                <TileTitle>{title}</TileTitle>
              </TileContent>
            </Tile>
          ))}
        </SectionGrid>
      </Container>
    </Section>
  )
}
