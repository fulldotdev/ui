import Abstract from "@/components/elements/abstract"
import Image from "@/components/elements/image"
import Links from "@/components/elements/links"
import Writeup from "@/components/elements/writeup"
import Column from "@/components/structures/column"
import Container from "@/components/structures/container"
import Grid from "@/components/structures/grid"
import Section from "@/components/structures/section"

interface Props {
  size?: "sm" | "default" | "lg"
  align?: "start" | "center" | "end"
  children?: React.ReactNode
  links?: React.ComponentProps<typeof Links>["links"]
  persons?: {
    title?: string
    description?: string
    image?: React.ComponentProps<typeof Image>
    href?: string
    [key: string]: any
  }[]
}

export default function ({ align, size, children, links, persons }: Props) {
  return (
    <Section id="persons">
      <Container className="container">
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
          {persons && persons.length > 0 && (
            <Grid size={size} className="not-first:mt-16">
              {persons?.map(({ title, tagline, image, href }, i) => (
                <Column key={i} align="center">
                  <Image
                    className="aspect-square h-full w-full max-w-56 overflow-hidden rounded-full object-cover"
                    sizes="200px"
                    {...image}
                  />
                  <Abstract
                    className="not-first:mt-6"
                    size={size}
                    align="center"
                  >
                    {title && <h3>{title}</h3>}
                    {tagline && <p>{tagline}</p>}
                  </Abstract>
                </Column>
              ))}
            </Grid>
          )}
        </Column>
      </Container>
    </Section>
  )
}
