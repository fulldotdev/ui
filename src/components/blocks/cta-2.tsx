import Background from "@/components/elements/background"
import Links from "@/components/elements/links"
import Writeup from "@/components/elements/writeup"
import Column from "@/components/structures/column"
import Container from "@/components/structures/container"
import Panel from "@/components/structures/panel"
import Section from "@/components/structures/section"

interface Props {
  size?: "sm" | "default" | "lg"
  align?: "start" | "center" | "end"
  children?: React.ReactNode
  links?: React.ComponentProps<typeof Links>["links"]
  background?: React.ComponentProps<typeof Background>["variant"]
}

export default function ({ children, links, size, align = "center" }: Props) {
  return (
    <Section>
      <Container>
        <Panel>
          <Column align={align}>
            <Writeup className="max-w-3xl" size={size} align={align}>
              {children}
            </Writeup>
            <Links
              className="not-first:mt-8"
              size={size}
              links={links}
              align={align}
            />
          </Column>
        </Panel>
      </Container>
    </Section>
  )
}
