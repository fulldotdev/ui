import type { BlockSchema } from "@/schemas/block"
import { Buttons } from "@/components/buttons"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Image } from "@/components/image"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

function Hero4({
  className,
  id,
  level = 1,
  title,
  description,
  buttons,
  image,
}: BlockSchema) {
  return (
    <Section
      className={`bg-background -mt-header mb-16 flex min-h-screen items-center md:py-32 ${className}`}
      id={id}
    >
      <Image
        className="absolute top-0 left-0 size-full object-cover opacity-40"
        {...image}
      />
      <Container className="pt-header relative flex h-full flex-col justify-center">
        <Title size="6xl" level={level}>
          {title}
        </Title>
        <Description className="not-first:mt-4" size="xl">
          {description}
        </Description>
        <Buttons className="not-first:mt-8" size="lg" buttons={buttons} />
      </Container>
    </Section>
  )
}

export { Hero4 }
