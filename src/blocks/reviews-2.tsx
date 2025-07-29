import type { BlockProps } from "@/lib/types"
import { Review, ReviewContent, ReviewRating } from "@/components/ui/review"
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

export default function ({ children, items }: BlockProps) {
  return (
    <Section>
      <SectionContainer>
        {children && <SectionContent>{children}</SectionContent>}
        <SectionMasonry className="not-first:mt-12">
          {items?.map(({ title, description, rating, image, tagline }, i) => (
            <Tile key={i}>
              {image && <TileImage {...image} />}
              <TileContent>
                {(rating || tagline) && (
                  <Review>
                    <ReviewContent>
                      {rating && <ReviewRating rating={rating} />}
                      {tagline}
                    </ReviewContent>
                  </Review>
                )}
                <TileTitle className="not-first:mt-2">{title}</TileTitle>
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
