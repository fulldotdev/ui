import Background from "@/components/elements/background"
import Links from "@/components/elements/links"
import Writeup from "@/components/elements/writeup"
import Column from "@/components/structures/column"
import Container from "@/components/structures/container"
import Section from "@/components/structures/section"

interface Props {
  size?: "sm" | "default" | "lg"
  align?: "start" | "center" | "end"
  children?: React.ReactNode
  links?: React.ComponentProps<typeof Links>["links"]
  background?: React.ComponentProps<typeof Background>["variant"]
}

export default function ({ align, size, background, children, links }: Props) {
  return (
    <Section className="relative -my-16 overflow-hidden py-40">
      <Background
        className="mask-y-from-white mask-y-from-75% mask-y-to-transparent"
        variant={background}
      />
      <Container>
        <Column align={align}>
          <Writeup
            className="text-balance not-first:mt-6"
            size={size}
            align={align}
          >
            {children}
          </Writeup>
          <Links
            className="gap-2 not-first:mt-8"
            size={size}
            links={links}
            align={align}
          />
        </Column>
      </Container>
    </Section>
  )
}
