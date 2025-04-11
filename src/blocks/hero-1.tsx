import type { BlockSchema } from "@/schemas/block"
import { Buttons } from "@/components/buttons"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Image } from "@/components/image"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

function Hero1({
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
      <Container className="flex flex-col items-center">
        <Title
          className="max-w-4xl text-center text-balance"
          size="7xl"
          level={level}
        >
          {title}
        </Title>
        <Description className="max-w-xl text-center not-first:mt-4" size="xl">
          {description}
        </Description>
        <Buttons
          className="justify-center not-first:mt-8"
          size="lg"
          buttons={buttons}
        />
        <Image className="rounded-lg not-first:mt-16" {...image} />
      </Container>
    </Section>
  )
}

export { Hero1 }
