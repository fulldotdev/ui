import type { BlockProps } from "@/lib/types"
import { Background } from "@/components/elements/background"
import { Chip } from "@/components/elements/chip"
import { Column } from "@/components/elements/column"
import { Container } from "@/components/elements/container"
import { Link } from "@/components/elements/link"
import { Typography } from "@/components/elements/prose"
import {
  Review,
  ReviewContent,
  ReviewImage,
  ReviewRating,
} from "@/components/elements/review-old"
import { Section } from "@/components/elements/section"
import { Split } from "@/components/elements/split"

export default function ({
  children,
  links,
  image,
  chip,
  rating,
  tagline,
  images,
  align = "center",
  size = "lg",
  background,
}: BlockProps) {
  return (
    <Section className="flex min-h-screen items-center">
      <Background
        className="mask-b-from-white mask-b-from-50% mask-b-to-transparent"
        variant={background}
      />
      <Container className="px-0 lg:px-0">
        <Split
          className="items-center gap-y-16 md:grid-cols-1 lg:grid-cols-2"
          align={align}
        >
          <Column align="start" className="px-4 lg:px-8">
            {chip && <Chip {...chip} />}
            {children && (
              <Typography
                className="animate-fade-1 text-balance not-first:mt-5"
                size={size}
              >
                {children}
              </Typography>
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
            {links && links.length > 0 && (
              <div className="inline-flex flex-wrap gap-2 not-first:mt-8">
                {links.map((link, i) => (
                  <Link
                    key={i}
                    variant={i === 0 ? "default" : "outline"}
                    size={size === "xl" ? "lg" : size}
                    {...link}
                  />
                ))}
              </div>
            )}
          </Column>
          {image?.src && (
            <img
              className="top-0 right-0 h-full w-1/2 object-cover lg:absolute"
              {...image}
            />
          )}
        </Split>
      </Container>
    </Section>
  )
}
