import type { BlockProps } from "@/lib/types"
import { Background } from "@/components/elements/background"
import { Column } from "@/components/elements/column"
import { Container } from "@/components/elements/container"
import { Link } from "@/components/elements/link"
import { Section } from "@/components/elements/section"
import { Split } from "@/components/elements/split"
import { Wrap } from "@/components/elements/wrap"
import { Writeup } from "@/components/elements/writeup"

export default function ({
  children,
  links,
  image,
  background,
  size,
  align = "center",
  index,
}: BlockProps) {
  return (
    <Section>
      <Background
        className="mask-b-from-white mask-b-from-50% mask-b-to-transparent"
        variant={background}
      />
      <Container>
        <Split align={align} reverse={index !== undefined && index % 2 === 1}>
          <Column align="start">
            {children && (
              <Writeup className="animate-fade-1 text-balance" size={size}>
                {children}
              </Writeup>
            )}
            {links && links.length > 0 && (
              <Wrap className="gap-2 not-first:mt-8">
                {links.map((link, i) => (
                  <Link
                    key={i}
                    variant={i === 0 ? "outline" : "ghost"}
                    size={size}
                    {...link}
                  />
                ))}
              </Wrap>
            )}
          </Column>
          {image?.src && (
            <img className="animate-fade-5 rounded-lg" {...image} />
          )}
        </Split>
      </Container>
    </Section>
  )
}
