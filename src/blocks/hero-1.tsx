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
    <Section>
      <div className="from-primary/10 pointer-events-none absolute -top-14 bottom-0 left-0 z-20 w-full bg-radial-[at_50%_0%] via-transparent to-transparent" />
      <SectionContainer className="flex flex-col items-center">
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
          className="animate-fade-1 text-center text-balance not-first:mt-5"
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
        {image?.src && (
          <img
            className="animate-fade-5 rounded-lg not-first:mt-16"
            {...image}
          />
        )}
      </SectionContainer>
    </Section>
  )
}
