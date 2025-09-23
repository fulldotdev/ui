import Image from "@/components/elements/image"
import Links from "@/components/elements/links"
import Prose from "@/components/elements/prose"
import Column from "@/components/structures/column"
import Container from "@/components/structures/container"
import Section from "@/components/structures/section"

interface Props {
  size?: "sm" | "default" | "lg"
  align?: "start" | "center" | "end"
  children?: React.ReactNode
  links?: React.ComponentProps<typeof Links>["links"]
  image?: React.ComponentProps<typeof Image>
}

export default function ({ align, children, links, image, size }: Props) {
  return (
    <Section id="content">
      <Container className="flex max-w-screen-lg flex-col items-center">
        <Image className="rounded-lg" {...image} />
        <Column align={align} className="not-first:mt-16">
          <Prose size={size} align={align}>
            {children}
          </Prose>
          <Links
            className="not-first:mt-8"
            size={size}
            links={links}
            align={align}
          />
        </Column>
      </Container>
    </Section>
  )
}
