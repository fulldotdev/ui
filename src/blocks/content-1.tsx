import type { BlockSchema } from "@/schemas/block"
import { Buttons } from "@/components/buttons"
import { Container } from "@/components/container"
import { Prose } from "@/components/prose"
import { Section } from "@/components/section"

function Content1({
  className,
  id,
  buttons,
  content,
  children,
}: BlockSchema & {
  children: React.ReactNode
}) {
  return (
    <Section className={className} id={id}>
      <Container className="flex flex-col">
        <Prose>
          {content}
          {children}
          <Buttons className="not-first:mt-8" buttons={buttons} />
        </Prose>
      </Container>
    </Section>
  )
}

export { Content1 }
