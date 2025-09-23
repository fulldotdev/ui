import Links from "@/components/elements/links"
import Person from "@/components/elements/person"
import Rating from "@/components/elements/rating"
import Writeup from "@/components/elements/writeup"
import Column from "@/components/structures/column"
import Container from "@/components/structures/container"
import Masonry from "@/components/structures/masonry"
import Section from "@/components/structures/section"

interface Props {
  align?: "start" | "center" | "end"
  size?: "sm" | "default" | "lg"
  children?: React.ReactNode
  links?: React.ComponentProps<typeof Links>["links"]
  reviews?: {
    title?: string
    description?: string
    rating?: number
    image?: React.ComponentProps<typeof Person>["image"]
    tagline?: string
  }[]
}

export default function ({
  align = "center",
  size,
  children,
  links,
  reviews,
}: Props) {
  return (
    <Section>
      <Container>
        <Column align={align}>
          <Writeup className="not-first:mt-4" size={size} align={align}>
            {children}
          </Writeup>
          <Links
            className="not-first:mt-8"
            size={size}
            links={links}
            align={align}
          />
          <Masonry className="not-first:mt-16">
            {reviews?.map(
              ({ title, description, rating, image, tagline }, i) => (
                <div
                  className="flex break-inside-avoid flex-col items-start overflow-hidden rounded-lg border p-6 text-start"
                  key={i}
                >
                  <Person image={image} title={title} tagline={tagline} />
                  <Rating className="not-first:mt-4" rating={rating} />
                  {description && (
                    <p className="text-muted-foreground text-base leading-7 not-first:mt-4">
                      {description}
                    </p>
                  )}
                </div>
              )
            )}
          </Masonry>
        </Column>
      </Container>
    </Section>
  )
}
