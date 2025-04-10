import type { BlockSchema } from "@/schemas/block"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/button"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { List } from "@/components/list"
import { Price } from "@/components/price"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

function Pricings1({
  className,
  id,
  level = 2,
  title,
  description,
  items,
}: BlockSchema) {
  return (
    <Section className={className} id={id}>
      <Container className="flex flex-col">
        <Title size="4xl" level={level}>
          {title}
        </Title>
        <Description className="not-first:mt-4" size="xl">
          {description}
        </Description>
        <div className="grid gap-x-4 gap-y-8 not-first:mt-16">
          {items?.map(({ title, description, price, list, button }) => (
            <Card className="flex flex-col gap-4 px-6 text-lg" key={title}>
              <Title level={level + 1} size="xl">
                {title}
              </Title>
              <Description className="not-first:mt-4" size="xl">
                {description}
              </Description>
              <Price className="text-2xl font-medium" {...price} />
              <List className="mt-8" items={list} />
              <Button className="mt-8" {...button} />
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export { Pricings1 }
