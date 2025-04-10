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
      <Container className="gap-8">
        <Column>
          <Title level={level} size="4xl">
            {title}
          </Title>
          <Description className="not-first:mt-4">{description}</Description>
          <Buttons className="not-first:mt-8" buttons={buttons} />
          <Masonry className="gap-x-4 gap-y-8 not-first:mt-16">
            {items?.map(({ rating, title, description }) => (
              <div className="flex flex-col rounded-lg border p-6" key={title}>
                <Rating score={rating} />
                <Title level={level + 1}>{title}</Title>
                <Description className="not-first:mt-1">
                  {description}
                </Description>
              </div>
            ))}
          </Masonry>
        </Column>
      </Container>
    </Section>
  )
}

export { Reviews1 }
