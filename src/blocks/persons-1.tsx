import type { BlockSchema } from "@/schemas/block"
import { Buttons } from "@/components/buttons"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Grid } from "@/components/grid"
import { Image } from "@/components/image"
import { Link } from "@/components/link"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

function Persons1({
  className,
  level = 2,
  title,
  description,
  buttons,
  items,
}: BlockSchema) {
  return (
    <Section className={className}>
      <Container className="flex flex-col items-center">
        <Title className="text-center" level={level} size="4xl">
          {title}
        </Title>
        <Description className="text-center not-first:mt-4">
          {description}
        </Description>
        <Buttons className="justify-center not-first:mt-8" buttons={buttons} />
        <Grid className="gap-16 not-first:mt-16">
          {items?.map(({ href, image, title, description }) => (
            <a
              className="group flex max-w-md flex-col items-center"
              key={href}
              href={href}
            >
              <Image
                className="aspect-square w-full max-w-60 rounded-full object-cover transition-opacity group-hover:opacity-75"
                {...image}
              />
              <Title className="not-first:mt-4" size="xl" level={level + 1}>
                {title}
              </Title>
              <Description className="not-first:mt-1" size="sm">
                {description}
              </Description>
            </a>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}

export { Persons1 }
