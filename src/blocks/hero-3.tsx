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

export default function ({ children, links, image, chip, review }: BlockProps) {
  return (
    <Section className="flex min-h-screen items-center">
      <SectionContainer className="px-0 lg:px-0">
        <SectionSplit className="items-center gap-y-16 md:grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col items-start px-4 lg:px-8">
            {chip && (
              <Chip
                className="animate-in fade-in fill-mode-backwards delay-700 duration-500 ease-in"
                variant="secondary"
                href={chip.href}
              >
                {chip.text}
              </Chip>
            )}
            {review && (
              <Review className="animate-in fade-in fill-mode-backwards delay-700 duration-500 ease-in not-first:mt-5">
                {review.images?.map((image, i) => (
                  <ReviewImage key={i} {...image} />
                ))}
                <ReviewContent>
                  <ReviewRating rating={review.rating} />
                  {review.tagline}
                </ReviewContent>
              </Review>
            )}
            <SectionContent
              className="animate-in fade-in fill-mode-backwards text-balance delay-250 duration-750 ease-in not-first:mt-5"
              size="lg"
            >
              {children}
            </SectionContent>
            {links && links.length > 0 && (
              <SectionFooter className="mt-8">
                {links.map(({ href, text }, i) => (
                  <Link
                    className={`animate-in fade-in fill-mode-backwards duration-500 ease-in ${i === 0 ? "delay-500" : "delay-600"}`}
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
