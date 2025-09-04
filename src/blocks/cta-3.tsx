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
    <Section className="overflow-hidden">
      <Background
        className="mask-y-from-white mask-y-from-75% mask-y-to-transparent"
        variant={background}
      />
      <Container>
        <Split
          align={align}
          reverse={index !== undefined && index % 2 === 1}
          className="bg-background rounded-2xl border p-4 lg:p-8"
        >
          <Column align="start" className="py-12 lg:py-16">
            {children && (
              <Writeup className="text-balance" size={size}>
                {children}
              </Writeup>
            )}
            {links && links.length > 0 && (
              <Wrap className="gap-2 not-first:mt-8">
                {links.map((link, i) => (
                  <Link
                    key={i}
                    variant={i === 0 ? "default" : "outline"}
                    size={size}
                    {...link}
                  />
                ))}
              </Wrap>
            )}
          </Column>
          {image?.src && <img className="rounded-lg" {...image} />}
        </Split>
      </Container>
    </Section>
  )
}
