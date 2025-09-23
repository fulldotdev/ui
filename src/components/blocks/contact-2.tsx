import Abstract from "@/components/elements/abstract"
import Form from "@/components/elements/form"
import Links from "@/components/elements/links"
import Social from "@/components/elements/social"
import Writeup from "@/components/elements/writeup"
import Column from "@/components/structures/column"
import Container from "@/components/structures/container"
import Section from "@/components/structures/section"
import Split from "@/components/structures/split"

interface Props {
  size?: "sm" | "default" | "lg"
  align?: "start" | "center" | "end"
  children?: React.ReactNode
  links?: React.ComponentProps<typeof Links>["links"]
  channels?: {
    text?: string
    href?: string
  }[]
  form?: any
}

export default function ({
  children,
  links,
  size,
  align,
  channels,
  form,
}: Props) {
  return (
    <Section>
      <Container>
        <Split align={align}>
          <Column align={align}>
            <Writeup className="max-w-3xl" size={size}>
              {children}
            </Writeup>
            <Links className="not-first:mt-8" size={size} links={links} />
            {channels && channels.length > 0 && (
              <Column className="not-first:mt-16">
                {channels?.map(({ text, href }, i) => (
                  <Column key={i} align={align}>
                    <Social variant="secondary" size={size} href={href} />
                    <Abstract
                      className="not-first:mt-4"
                      size={size}
                      align={align}
                    >
                      {text}
                    </Abstract>
                  </Column>
                ))}
              </Column>
            )}
          </Column>
          <Form {...form} />
        </Split>
      </Container>
    </Section>
  )
}
