import type { BlockSchema } from "@/schemas/block"
import { Buttons } from "@/components/buttons"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Link } from "@/components/link"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

function Events1({
  className,
  id,
  level = 2,
  title,
  description,
  buttons,
  items,
}: BlockSchema) {
  return (
    <Section className={className} id={id}>
      <Container className="flex flex-col" size="sm">
        <Title size="4xl" level={level}>
          {title}
        </Title>
        <Description className="not-first:mt-4">{description}</Description>
        <Buttons className="not-first:mt-8" buttons={buttons} />
        <div className="flex flex-col gap-4 not-first:mt-16">
          {items?.map(({ href, title, description }) => (
            <Link
              href={href}
              className="flex flex-col items-start gap-4 rounded-lg border p-6"
              key={href}
            >
              <Title level={level + 1}>{title}</Title>
              <Description>{description}</Description>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export { Events1 }
