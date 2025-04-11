import type { BlockSchema } from "@/schemas/block"
import { Buttons } from "@/components/buttons"
import { Column } from "@/components/column"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Masonry } from "@/components/masonry"
import { Rating } from "@/components/rating"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

function Reviews1({
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
      <Container className="flex flex-col items-center">
        <Title className="text-center" level={level} size="5xl">
          {title}
        </Title>
        <Description className="text-center not-first:mt-4">
          {description}
        </Description>
        <Buttons className="justify-center not-first:mt-8" buttons={buttons} />
        <Masonry className="gap-x-4 gap-y-8 not-first:mt-16">
          {items?.map(({ rating, title, description }) => (
            <div className="flex flex-col rounded-lg border p-6" key={title}>
              <Rating score={rating} />
              <Title className="not-first:mt-3" level={level + 1}>
                {title}
              </Title>
              <Description className="not-first:mt-1">
                {description}
              </Description>
            </div>
          ))}
        </Masonry>
      </Container>
    </Section>
  )
}

export { Reviews1 }
