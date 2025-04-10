import type { BlockSchema } from "@/schemas/block"
import { Buttons } from "@/components/buttons"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Image } from "@/components/image"
import { Link } from "@/components/link"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

function Collections1({
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
        <Title size="3xl" level={level}>
          {title}
        </Title>
        <Description className="not-first:mt-4">{description}</Description>
        <Buttons className="not-first:mt-8 max-lg:hidden" buttons={buttons} />
        <div className="grid grid-cols-1 gap-8 not-first:mt-8 md:grid-cols-2 lg:grid-cols-3">
          {items?.map(({ href, title, image }) => (
            <Link className="group flex flex-col" key={href} href={href}>
              <Image
                className="rounded-md transition-opacity group-hover:opacity-75"
                {...image}
              />
              <Title className="not-first:mt-4" level={level + 1}>
                {title}
              </Title>
            </Link>
          ))}
        </div>
        <Buttons className="not-first:mt-8 lg:hidden" buttons={buttons} />
      </Container>
    </Section>
  )
}

export { Collections1 }
