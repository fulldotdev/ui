import type { BlockProps } from "@/lib/types"
import {
  Section,
  SectionContainer,
  SectionContent,
  SectionGrid,
} from "@/components/ui/section"
import {
  Tile,
  TileContent,
  TileDescription,
  TileImage,
  TileTagline,
  TileTitle,
} from "@/components/ui/tile"

export default function ({ children, items }: BlockProps) {
  return (
    <Section>
      <SectionContainer className="flex flex-col items-start">
        {children && <SectionContent size="4xl">{children}</SectionContent>}
        <SectionGrid className="not-first:mt-12">
          {items?.map(({ href, image, title, tagline, description }) => (
            <Tile key={href} href={href} panel={false}>
              <TileImage
                className="aspect-square object-cover"
                alt={`${title} ${tagline}`}
                {...image}
              />
              <TileContent>
                {tagline && <TileTagline>{tagline}</TileTagline>}
                <TileTitle>{title}</TileTitle>
                {description && (
                  <TileDescription>{description}</TileDescription>
                )}
              </TileContent>
            </Tile>
          ))}
        </SectionGrid>
      </SectionContainer>
    </Section>
  )
}
