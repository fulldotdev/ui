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
  src?: string
}

export default function ({ align, children, links, size, src }: Props) {
  return (
    <Section id="map">
      <Container className="container">
        <Split align={align}>
          <Column align="start">
            <Writeup size={size}>{children}</Writeup>
            <Links className="not-first:mt-8" size={size} links={links} />
          </Column>
          <iframe
            src={src}
            width="640"
            height="480"
            className="bg-muted aspect-video h-full w-full overflow-hidden rounded-lg"
          ></iframe>
        </Split>
      </Container>
    </Section>
  )
}
