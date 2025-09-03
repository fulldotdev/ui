import type { BlockProps } from "@/lib/types"
import { Background } from "@/components/elements/background"
import { Chip } from "@/components/elements/chip"
import { Column } from "@/components/elements/column"
import { Container } from "@/components/elements/container"
import { Link } from "@/components/elements/link"
import {
  Review,
  ReviewContent,
  ReviewImage,
  ReviewRating,
} from "@/components/elements/review"
import { Section } from "@/components/elements/section"
import { Split } from "@/components/elements/split"
import { Wrap } from "@/components/elements/wrap"
import { Writeup } from "@/components/elements/writeup"

export default function ({
  children,
  links,
  image,
  chip,
  rating,
  tagline,
  images,
  background,
  align = "center",
  size = "lg",
}: BlockProps) {
  return (
    <Section>
      <Background
        className="mask-b-from-white mask-b-from-50% mask-b-to-transparent"
        variant={background}
      />
      <Container>
        <Split align={align}>
          <Column align="start">
            {chip && <Chip {...chip} />}
            {children && (
              <Writeup
                className="animate-fade-1 text-balance not-first:mt-5"
                size={size}
              >
                {children}
              </Writeup>
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
              <Wrap className="gap-2 not-first:mt-8">
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
          </Column>
          {image?.src && (
            <img className="animate-fade-5 rounded-lg" {...image} />
          )}
        </Split>
      </Container>
    </Section>
  )
}
