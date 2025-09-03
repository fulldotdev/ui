import type { BlockProps } from "@/lib/types"
import { Abstract } from "@/components/elements/abstract"
import { Column } from "@/components/elements/column"
import { Container } from "@/components/elements/container"
import { Link } from "@/components/elements/link"
import { Masonry } from "@/components/elements/masonry"
import {
  Review,
  ReviewContent,
  ReviewImage,
  ReviewRating,
} from "@/components/elements/review"
import { Section } from "@/components/elements/section"
import { Tile } from "@/components/elements/tile"
import { Wrap } from "@/components/elements/wrap"
import { Writeup } from "@/components/elements/writeup"

export default function ({
  children,
  tagline,
  links,
  items,
  align,
  size,
}: BlockProps) {
  return (
    <Section>
      <Container>
        <Column align={align}>
          {tagline && (
            <span className="text-accent-foreground text-sm font-medium">
              {tagline}
            </span>
          )}
          {children && (
            <Writeup className="not-first:mt-4" align={align} size={size}>
              {children}
            </Writeup>
          )}
          {links && links.length > 0 && (
            <Wrap className="gap-2 not-first:mt-8 not-last:mb-4" align={align}>
              {links.map((link, i) => (
                <Link
                  key={i}
                  variant={i === 0 ? "default" : "outline"}
                  size={size}
                  {...link}
                />
              ))}
            </Wrap>
          )}
          <Masonry className="not-first:mt-12" size={size}>
            {items?.map(({ title, description, rating, image, tagline }, i) => (
              <Tile className="p-6" key={i} variant="outline">
                <Review>
                  {image && <ReviewImage {...image} />}
                  <ReviewContent>
                    {rating && <ReviewRating rating={rating} />}
                    {tagline}
                  </ReviewContent>
                </Review>
                <Abstract className="not-first:mt-4" size={size}>
                  {title && <h3>{title}</h3>}
                  {description && <p>{description}</p>}
                </Abstract>
              </Tile>
            ))}
          </Masonry>
        </Column>
      </Container>
    </Section>
  )
}
