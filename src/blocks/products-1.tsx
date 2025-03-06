import * as React from "react"
import { v4 as uuidv4 } from "uuid"

import { cn } from "@/lib/utils"
import { Abstract } from "@/components/abstract"
import { Buttons } from "@/components/buttons"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Grid } from "@/components/grid"
import { Image } from "@/components/image"
import { Link } from "@/components/link"
import { Price } from "@/components/price"
import { Section } from "@/components/section"
import { Title } from "@/components/title"
import { Writeup } from "@/components/writeup"

interface Props extends React.ComponentProps<typeof Section> {
  level?: React.ComponentProps<typeof Title>["level"]
  size?: React.ComponentProps<typeof Title>["size"]
  align?: React.ComponentProps<typeof Title>["align"]
  title?: React.ComponentProps<typeof Title>["text"]
  description?: React.ComponentProps<typeof Description>["text"]
  buttons?: React.ComponentProps<typeof Buttons>["buttons"]
  products?: {
    href?: string
    title?: React.ComponentProps<typeof Title>["text"]
    images?: React.ComponentProps<typeof Image>[]
    price?: React.ComponentProps<typeof Price>
  }[]
}

function Products1({
  level = 2,
  size,
  align,
  title,
  description,
  buttons,
  products,
  className,
  ...props
}: Props) {
  return (
    <Section className={cn(className)} {...props}>
      <Container className="gap-8">
        <Title level={level} size={size} align={align} text={title} />
        <Description
          className="not-first:mt-4"
          size={size}
          align={align}
          text={description}
        />
        <Buttons
          className="max-sm:hidden"
          size={size}
          align={align}
          buttons={buttons}
        />
        <Grid className="mt-8 gap-x-4 gap-y-8 first:mt-0">
          {products?.map(({ href, title, images, price }) => (
            <Link
              className="group flex flex-col gap-4"
              key={uuidv4()}
              href={href}
            >
              <Image
                className="bg-muted ring-muted aspect-square rounded-md object-contain p-4 ring-1 transition-opacity group-hover:opacity-75"
                {...images?.[0]}
              />
              <Title level={level + 1} size={size} align={align} />
              <Price className="text-muted-foreground text-sm" {...price} />
            </Link>
          ))}
        </Grid>
        <Buttons className="sm:hidden" buttons={buttons} />
      </Container>
    </Section>
  )
}

export { Products1 }
