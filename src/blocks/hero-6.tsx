import type { BlockProps } from "@/lib/types"
import { Chip } from "@/components/ui/chip"
import { Link } from "@/components/ui/link"
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

export default function ({
  children,
  links,
  chip,
  rating,
  tagline,
  images,
  items,
}: BlockProps) {
  return (
    <Section className="pt-16">
      <div className="from-primary/15 pointer-events-none absolute -top-14 bottom-0 left-0 z-20 w-full bg-radial-[at_15%_0%] via-transparent to-transparent" />
      <SectionContainer className="flex flex-col">
        {chip && (
          <Chip className="animate-fade-4" variant="secondary" href={chip.href}>
            {chip.text}
          </Chip>
        )}
        {rating && (
          <Review className="animate-fade-4 not-first:mt-5">
            {images?.map((image, i) => (
              <ReviewImage key={i} {...image} />
            ))}
            <ReviewContent>
              <ReviewRating rating={rating} />
              {tagline}
            </ReviewContent>
          </Review>
        )}
        <SectionContent
          size="xl"
          className="animate-fade-1 text-balance not-first:mt-8"
        >
          {children}
        </SectionContent>
        {links && links.length > 0 && (
          <SectionFooter className="mt-8">
            {links.map(({ href, text }, i) => (
              <Link
                className={i === 0 ? "animate-fade-2" : "animate-fade-3"}
                key={i}
                href={href}
                variant={i === 0 ? "default" : "outline"}
                size="lg"
              >
                {text}
              </Link>
            ))}
          </SectionFooter>
        )}
        <SectionGrid className="not-first:mt-16">
          {items?.map(({ title, description, image, href }, i) => (
            <Tile
              key={i}
              href={href}
              className={`${
                i === 0
                  ? "animate-fade-2"
                  : i === 1
                    ? "animate-fade-3"
                    : "animate-fade-4"
              }`}
            >
              <TileImage className="aspect-4/3 object-cover" {...image} />
              <TileContent>
                <TileTitle className="text-lg">{title}</TileTitle>
                {description && (
                  <TileDescription className="text-base">
                    {description}
                  </TileDescription>
                )}
              </TileContent>
            </Tile>
          ))}
        </SectionGrid>
      </SectionContainer>
    </Section>
  )
}
