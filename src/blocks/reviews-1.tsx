import type { BlockProps } from "@/lib/types"
import {
  Review,
  ReviewContent,
  ReviewImage,
  ReviewRating,
} from "@/components/ui/review"
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
  TileTitle,
} from "@/components/ui/tile"

export default function ({ children, tagline, items }: BlockProps) {
  return (
    <Section>
      <SectionContainer className="flex flex-col items-center">
        {tagline && (
          <span className="text-accent-foreground text-sm font-medium">
            {tagline}
          </span>
        )}
        {children && (
          <SectionContent className="text-center not-first:mt-4" size="lg">
            {children}
          </SectionContent>
        )}
        <SectionMasonry className="gap-4 space-y-6 not-first:mt-16">
          {items?.map(({ title, description, rating, image, tagline }, i) => (
            <Tile key={i}>
              <TileContent>
                <Review>
                  {image && <ReviewImage {...image} />}
                  <ReviewContent>
                    {rating && <ReviewRating rating={rating} />}
                    {tagline}
                  </ReviewContent>
                </Review>
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
