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
    <Section>
      <SectionContainer>
        <SectionSplit className="items-center">
          <div className="flex flex-col items-start">
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
          {image?.src && <img className="rounded-lg" {...image} />}
        </SectionSplit>
      </SectionContainer>
    </Section>
  )
}
