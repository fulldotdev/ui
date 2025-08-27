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
  SectionSplit,
} from "@/components/ui/section"

export default function ({
  children,
  links,
  image,
  chip,
  rating,
  tagline,
  images,
}: BlockProps) {
  return (
    <Section className="flex min-h-screen items-center">
      <SectionContainer className="px-0 lg:px-0">
        <SectionSplit className="items-center gap-y-16 md:grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col items-start px-4 lg:px-8">
            {chip && (
              <Chip
                className="animate-fade-4"
                variant="secondary"
                href={chip.href}
              >
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
              className="animate-fade-1 text-balance not-first:mt-5"
              size="lg"
            >
              {children}
            </SectionContent>
            {links && links.length > 0 && (
              <SectionFooter className="mt-8">
                {links.map(({ href, text }, i) => (
                  <Link
                    className={i === 0 ? "animate-fade-2" : "animate-fade-3"}
                    key={href}
                    href={href}
                    variant={i === 0 ? "default" : "outline"}
                    size="lg"
                  >
                    {text}
                  </Link>
                ))}
              </SectionFooter>
            )}
          </div>
          {image?.src && (
            <img
              className="top-0 right-0 h-full w-1/2 object-cover lg:absolute"
              {...image}
            />
          )}
        </SectionSplit>
      </SectionContainer>
    </Section>
  )
}
