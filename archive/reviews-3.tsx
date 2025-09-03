import type { BlockProps } from "@/lib/types"
import {
  Review,
  ReviewContent,
  ReviewImage,
  ReviewRating,
} from "@/components/elements/review"
import {
  Container,
  Section,
  SectionContent,
  SectionMasonry,
} from "@/components/elements/section"
import {
  Tile,
  TileContent,
  TileDescription,
  TileTitle,
} from "@/components/elements/tile"

export default function ({ children, tagline, items, image }: BlockProps) {
  return (
    <Section>
      {image?.src && (
        <img
          {...image}
          className="mask-linear absolute top-0 left-0 -z-10 h-auto max-h-[400px] w-full mask-b-from-black/30 mask-b-to-transparent object-cover"
        />
      )}
      <Container className="flex flex-col items-center">
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
      </Container>
    </Section>
  )
}
