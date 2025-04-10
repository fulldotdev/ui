import { v4 as uuidv4 } from "uuid"

import type { BlockSchema } from "@/schemas/block"
import { Buttons } from "@/components/buttons"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Image } from "@/components/image"
import { Link } from "@/components/link"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

function Posts1({
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
      <Container className="flex flex-col">
        <Title size="4xl" level={level}>
          {title}
        </Title>
        <Description className="not-first:mt-4">{description}</Description>
        <Buttons className="not-first:mt-8" buttons={buttons} />
        <div className="grid gap-4 gap-y-8 not-first:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {items?.map(({ href, title, image }) => (
            <Link
              className="group flex flex-col gap-3"
              key={uuidv4()}
              href={href}
            >
              <Image
                className="bg-card rounded-lg object-contain transition-opacity group-hover:opacity-75"
                {...image}
              />
              <Title level={level + 1} size="xl">
                {title}
              </Title>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export { Posts1 }
