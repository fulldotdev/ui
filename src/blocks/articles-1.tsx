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
      <SectionContainer>
        {children && (
          <SectionContent className="mb-12" size="3xl">
            {children}
          </SectionContent>
        )}
        <SectionGrid>
          {items?.map(({ href, title, description, image, published }, i) => (
            <Tile className="gap-2" key={i} href={href} panel={false}>
              <TileImage className="aspect-4/3 object-cover" {...image} />
              <TileContent className="mt-0">
                <TileTagline>
                  {published?.toLocaleDateString("nl-NL")}
                </TileTagline>
                <TileTitle className="text-lg">{title}</TileTitle>
                <TileDescription>{description}</TileDescription>
              </TileContent>
            </Tile>
          ))}
        </SectionGrid>
      </SectionContainer>
    </Section>
  )
}
