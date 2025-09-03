import type { BlockProps } from "@/lib/types"
import { Abstract } from "@/components/elements/abstract"
import { Column } from "@/components/elements/column"
import { Container } from "@/components/elements/container"
import { Grid } from "@/components/elements/grid"
import { Link } from "@/components/elements/link"
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
import { Marquee } from "@/components/magicui/marquee"

export default function ({
  children,
  links,
  items,
  size,
  align = "center",
}: BlockProps) {
  const oneFifth = Math.floor((items?.length || 0) / 5)
  const columns = [
    items,
    items ? [...items.slice(oneFifth), ...items.slice(0, oneFifth)] : undefined,
    items
      ? [...items.slice(oneFifth * 2), ...items.slice(0, oneFifth * 2)]
      : undefined,
    items
      ? [...items.slice(oneFifth * 3), ...items.slice(0, oneFifth * 3)]
      : undefined,
    items
      ? [...items.slice(oneFifth * 4), ...items.slice(0, oneFifth * 4)]
      : undefined,
  ]
  const duration = items?.length * 5
  return (
    <Section>
      <Container>
        <Column align={align}>
          {children && (
            <Writeup className="not-first:mt-4" align={align} size={size}>
              {children}
            </Writeup>
          )}
          {links && links.length > 0 && (
            <Wrap className="gap-2 not-first:mt-8" align={align}>
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
          <Grid
            className="relative max-h-[700px] overflow-hidden not-first:mt-16"
            size={size}
          >
            {columns.map((column, i) => (
              <Marquee
                key={i}
                pauseOnHover
                vertical
                className={`px-0`}
                style={{ "--duration": `${duration}s` } as React.CSSProperties}
              >
                {column?.map(
                  ({ title, description, rating, image, tagline }, i) => (
                    <Tile className="p-6" key={i} variant="outline">
                      <Review>
                        {image && <ReviewImage {...image} />}
                        <ReviewContent>
                          {rating && <ReviewRating rating={rating} />}
                          {tagline}
                        </ReviewContent>
                      </Review>
                      <Abstract className="not-first:mt-4">
                        {title && <h3>{title}</h3>}
                        {description && <p>{description}</p>}
                      </Abstract>
                    </Tile>
                  )
                )}
              </Marquee>
            ))}
            <div className="from-background pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b"></div>
            <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-[100px] bg-gradient-to-t"></div>
          </Grid>
        </Column>
      </Container>
    </Section>
  )
}
