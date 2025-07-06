import type { BlockProps } from "@/lib/types"
import {
  Section,
  SectionContainer,
  SectionContent,
  SectionMasonry,
} from "@/components/ui/section"
import {
  Tile,
  TileContent,
  TileDescription,
  TileImage,
  TileTitle,
} from "@/components/ui/tile"
import { Rating } from "@/components/rating"

export default function ({ children, items }: BlockProps) {
  return (
    <Section>
      <SectionContainer>
        {children && <SectionContent>{children}</SectionContent>}
        <SectionMasonry className="not-first:mt-12">
          {items?.map(({ title, description, rating, avatar }, i) => (
            <Tile className="break-inside-avoid" key={i}>
              {avatar?.src && <TileImage alt={`Review ${i + 1}`} {...avatar} />}
              <TileContent>
                {rating && <Rating score={rating} />}
                <TileTitle>{title}</TileTitle>
                {description && (
                  <TileDescription>{description}</TileDescription>
                )}
              </TileContent>
            </Tile>
          ))}
        </SectionMasonry>
      </SectionContainer>
    </Section>
  )
}
