import Abstract from "@/components/elements/abstract"
import Image from "@/components/elements/image"
import Links from "@/components/elements/links"
import Writeup from "@/components/elements/writeup"
import Column from "@/components/structures/column"
import Container from "@/components/structures/container"
import Grid from "@/components/structures/grid"
import Section from "@/components/structures/section"

interface Props {
  align?: "start" | "center" | "end"
  size?: "sm" | "default" | "lg"
  children?: React.ReactNode
  links?: React.ComponentProps<typeof Links>["links"]
  services?: {
    href?: string
    title?: string
    description?: string
    image?: React.ComponentProps<typeof Image>
  }[]
}

export default function ({ align, size, children, links, services }: Props) {
  return (
    <Section id="services">
      <Container>
        <Column align={align}>
          <Writeup className="not-first:mt-4" size={size}>
            {children}
          </Writeup>
          <Links
            className="not-first:mt-8 not-last:mb-4"
            size={size}
            links={links}
          />
          <Grid className="gap-4 not-first:mt-16">
            {services?.map(({ title, description, image, href }, i) => (
              <a
                href={href}
                className="group flex flex-col items-start"
                key={i}
              >
                <Image
                  className="aspect-4/3 rounded-lg object-cover transition-opacity group-hover:opacity-75"
                  sizes="200px"
                  {...image}
                />
                <Abstract
                  className="not-first:mt-4"
                  size={size}
                  align={align}
                  title={title}
                  description={description}
                />
              </a>
            ))}
          </Grid>
        </Column>
      </Container>
    </Section>
  )
}
