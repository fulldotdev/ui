import type { BlockSchema } from "@/schemas/block"
import { Buttons } from "@/components/buttons"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Grid } from "@/components/grid"
import { Image } from "@/components/image"
import { Link } from "@/components/link"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

function Pages1({
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
        <Title size="4xl" level={level}>
          {title}
        </Title>
        <Description className="not-first:mt-4">{description}</Description>
        <Buttons className="not-first:mt-8" buttons={buttons} />
        <Grid className="gap-4 gap-y-8 not-first:mt-16">
          {items?.map(({ href, title, description, image }) => (
            <Link key={href} className="group flex flex-col" href={href}>
              <Image
                className="rounded-lg transition-opacity group-hover:opacity-75"
                {...image}
              />
              <Title className="not-first:mt-3" size="lg" level={level}>
                {title}
              </Title>
              <Description className="not-first:mt-1">
                {description}
              </Description>
            </Link>
          ))}
        </Grid>
        <Buttons className="not-first:mt-8" buttons={buttons} />
      </Container>
    </Section>
  )
}

export { Pages1 }
