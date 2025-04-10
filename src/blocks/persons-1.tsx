import type { BlockSchema } from "@/schemas/block"
import { Buttons } from "@/components/buttons"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Image } from "@/components/image"
import { Link } from "@/components/link"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

function Persons1({
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
        <Title level={level} size="4xl">
          {title}
        </Title>
        <Description className="not-first:mt-4">{description}</Description>
        <Buttons className="not-first:mt-8" buttons={buttons} />
        <div className="grid gap-16 not-first:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {items?.map(({ href, image, title, description }) => (
            <Link className="group max-w-md" key={href} href={href}>
              <Image
                className="aspect-square w-full max-w-60 rounded-full object-cover transition-opacity group-hover:opacity-75"
                {...image}
              />
              <Title className="text-xl not-first:mt-4" level={level + 1}>
                {title}
              </Title>
              <Description className="not-first:mt-1">
                {description}
              </Description>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export { Persons1 }
