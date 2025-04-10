import type { BlockSchema } from "@/schemas/block"
import { Buttons } from "@/components/buttons"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Image } from "@/components/image"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

function Hero2({
  className,
  id,
  level = 1,
  title,
  description,
  buttons,
  image,
}: BlockSchema) {
  return (
    <Section className={className} id={id}>
      <Container className="grid items-center gap-y-8 md:grid-cols-2 md:gap-x-8 lg:gap-x-16">
        <div className="flex flex-col items-start">
          <Title size="6xl" level={level}>
            {title}
          </Title>
          <Description className="not-first:mt-4" size="xl">
            {description}
          </Description>
        </div>

        <Buttons className="not-first:mt-8" size="lg" buttons={buttons} />
        <Image className="rounded-lg not-first:mt-16 md:mt-0" {...image} />
      </Container>
    </Section>
  )
}

export { Hero2 }
