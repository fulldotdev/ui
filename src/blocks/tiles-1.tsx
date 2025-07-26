import type { BlockProps } from "@/lib/types"
import { Link } from "@/components/ui/link"
import {
  Section,
  SectionContainer,
  SectionContent,
  SectionFooter,
  SectionGrid,
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
      </SectionContainer>
    </Section>
  )
}
