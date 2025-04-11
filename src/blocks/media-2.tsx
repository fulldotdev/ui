import type { BlockSchema } from "@/schemas/block"
import { Buttons } from "@/components/buttons"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Image } from "@/components/image"
import { Section } from "@/components/section"
import { Split } from "@/components/split"
import { Title } from "@/components/title"

function Media2({
  className,
  id,
  level = 2,
  title,
  description,
  buttons,
  image,
}: BlockSchema) {
  return (
    <Section className={className} id={id}>
      <Container>
        <Split className="items-center">
          <div className="flex flex-col items-start">
            <Title size="4xl" level={level}>
              {title}
            </Title>
            <Description className="not-first:mt-4">{description}</Description>
            <Buttons className="not-first:mt-8" buttons={buttons} />
          </div>
          <Image className="rounded-lg" {...image} />
        </Split>
      </Container>
    </Section>
  )
}

export { Media2 }
