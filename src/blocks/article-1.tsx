import type { BlockProps } from "@/lib/types"
import { Background } from "@/components/elements/background"
import { Column } from "@/components/elements/column"
import { Container } from "@/components/elements/container"
import { Prose } from "@/components/elements/prose"
import { Section } from "@/components/elements/section"
import { Writeup } from "@/components/elements/writeup"

export default function ({
  children,
  title,
  description,
  image,
  size,
  align,
}: BlockProps) {
  return (
    <Section>
      <Container>
        <Column align="center" className="gap-16">
          {children && (
            <Writeup size={size} align={align}>
              {title && <h1>{title}</h1>}
              {description && <p>{description}</p>}
            </Writeup>
          )}
          {image?.src && <img className="max-w-5xl rounded-lg" {...image} />}
          <Prose size={size}>{children}</Prose>
        </Column>
      </Container>
    </Section>
  )
}
