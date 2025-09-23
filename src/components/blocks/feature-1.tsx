import Image from "@/components/elements/image"
import Links from "@/components/elements/links"
import Writeup from "@/components/elements/writeup"
import Container from "@/components/structures/container"
import Section from "@/components/structures/section"
import Split from "@/components/structures/split"

import Column from "../structures/column"

interface Props {
  size?: "sm" | "default" | "lg"
  align?: "start" | "center" | "end"
  children?: React.ReactNode
  links?: React.ComponentProps<typeof Links>["links"]
  image?: React.ComponentProps<typeof Image>
}

export default function ({
  align = "center",
  children,
  links,
  image,
  size,
}: Props) {
  return (
    <Section className="py-24">
      <Container className="container">
        <Split align={align}>
          <Column align="start">
            <Writeup size={size}>{children}</Writeup>
            <Links className="not-first:mt-8" size={size} links={links} />
          </Column>
          <Image className="rounded-lg" {...image} />
        </Split>
      </Container>
    </Section>
  )
}
