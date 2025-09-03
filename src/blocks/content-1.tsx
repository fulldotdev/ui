import type { BlockProps } from "@/lib/types"
import { Column } from "@/components/elements/column"
import { Container } from "@/components/elements/container"
import { Link } from "@/components/elements/link"
import { Section } from "@/components/elements/section"
import { Wrap } from "@/components/elements/wrap"
import { Writeup } from "@/components/elements/writeup"

export default function ({ children, links, image, size, align }: BlockProps) {
  return (
    <Section className="overflow-hidden pt-0">
      <Container>
        <Column align={align} className="relative py-24">
          {children && (
            <Writeup
              className="text-balance not-first:mt-6"
              size={size}
              align={align}
            >
              {children}
            </Writeup>
          )}
          {links && links.length > 0 && (
            <Wrap className="gap-2 not-first:mt-8" align={align}>
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
        <Column align={align}>
          {image?.src && (
            <img className="rounded-lg not-first:mt-16" {...image} />
          )}
        </Column>
      </Container>
    </Section>
  )
}
