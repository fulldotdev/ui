import Abstract from "@/components/elements/abstract"
import Form from "@/components/elements/form"
import Links from "@/components/elements/links"
import Social from "@/components/elements/social"
import Writeup from "@/components/elements/writeup"
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
    <Section id="contact">
      <Container>
        <Split align={align}>
          <div className="flex flex-col items-start">
            <Writeup className="max-w-3xl" size={size}>
              {children}
            </Writeup>
            <Links
              className="not-first:mt-8 not-last:mb-4"
              size={size}
              links={links}
            />
            {channels && channels.length > 0 && (
              <div className="flex flex-col items-start gap-4 not-first:mt-12">
                {channels?.map(({ text, href }, i) => (
                  <div className="flex items-center gap-4" key={i}>
                    <Social variant="secondary" size={size} href={href} />
                    <Abstract size={size} align={align}>
                      {text}
                    </Abstract>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Form {...form} />
        </Split>
      </Container>
    </Section>
  )
}
