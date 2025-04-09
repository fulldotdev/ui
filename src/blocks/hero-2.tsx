import type { BlockSchema } from "@/schemas/block"

import { cn, uuid } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Column } from "@/components/column"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Image } from "@/components/image"
import { Link } from "@/components/link"
import { Row } from "@/components/row"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

function Hero2({
  level = 1,
  align,
  title,
  description,
  buttons,
  image,
  className,
  ...props
}: BlockSchema) {
  return (
    <Section className={cn(className)} {...props}>
      <Container>
        <Column align={align}>
          <Title size="6xl" level={level} align={align} text={title} />
          <Description
            className="not-first:mt-4"
            size="xl"
            align={align}
            text={description}
          />
          <Row className="flex-wrap not-first:mt-8" align={align}>
            {buttons?.map(({ text, href, ...button }) => (
              <Button asChild key={uuid()} size="lg" {...button}>
                <Link href={href}>{text}</Link>
              </Button>
            ))}
          </Row>
          <Image className="rounded-lg not-first:mt-16" {...image} />
        </Column>
      </Container>
    </Section>
  )
}

export { Hero2 }
