import type { BlockProps } from "@/lib/types"
import { Chip } from "@/components/elements/chip"
import { Link } from "@/components/elements/link"
import {
  Review,
  ReviewContent,
  ReviewImage,
  ReviewRating,
} from "@/components/elements/review-old"
import {
  Container,
  Section,
  SectionContent,
  SectionFooter,
} from "@/components/elements/section"

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
      {image?.src && (
        <img
          className="absolute inset-0 size-full object-cover opacity-25"
          {...image}
        />
      )}
      <Container className="relative flex flex-col items-center">
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
      </Container>
    </Section>
  )
}
