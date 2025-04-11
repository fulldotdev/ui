import type { BlockSchema } from "@/schemas/block"
import { Buttons } from "@/components/buttons"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Grid } from "@/components/grid"
import { Image } from "@/components/image"
import { Link } from "@/components/link"
import { Price } from "@/components/price"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

function Blog1({
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
        <Title level={level} size="3xl">
          {title}
        </Title>
        <Description className="not-first:mt-4" size="lg">
          {description}
        </Description>
        <Buttons className="not-first:mt-8 max-sm:hidden" buttons={buttons} />
        <Grid className="gap-8 not-first:mt-8">
          {items?.map(({ href, title, image, price }) => (
            <Link className="group flex flex-col" key={href} href={href}>
              <Image
                className="rounded-md transition-opacity group-hover:opacity-75"
                {...image}
              />
              <Title className="not-first:mt-4" level={level + 1} size="xl">
                {title}
              </Title>
              <Price
                className="text-muted-foreground text-sm not-first:mt-2"
                {...price}
              />
            </Link>
          ))}
        </Grid>
        <Buttons className="sm:hidden" buttons={buttons} />
      </Container>
    </Section>
  )
}

export { Blog1 }
