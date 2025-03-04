import * as React from "react"
import { v4 as uuidv4 } from "uuid"

import { Buttons } from "@/components/buttons"
import { Container } from "@/components/container"
import { Grid } from "@/components/grid"
import { Image } from "@/components/image"
import { Link } from "@/components/link"
import { Section } from "@/components/section"
import { Writeup } from "@/components/writeup"

interface Props extends React.ComponentProps<typeof Section> {
  level?: React.ComponentProps<typeof Writeup>["level"]
  size?: React.ComponentProps<typeof Writeup>["size"]
  align?: React.ComponentProps<typeof Writeup>["align"]
  title?: React.ComponentProps<typeof Writeup>["title"]
  description?: React.ComponentProps<typeof Writeup>["description"]
  buttons?: React.ComponentProps<typeof Buttons>["buttons"]
  collections?: {
    href?: React.ComponentProps<typeof Link>["href"]
    image?: React.ComponentProps<typeof Image>
    title?: string
  }[]
}

function Collections1({
  level,
  size,
  align,
  title,
  description,
  buttons,
  collections,
  children,
}: Props) {
  return (
    <Section className="collections collections-1">
      <Container className="gap-8" align={align}>
        <Writeup
          level={level}
          size={size}
          align={align}
          title={title}
          description={description}
        >
          {children}
        </Writeup>
        <Buttons className="max-lg:hidden" align={align} buttons={buttons} />
        <Grid className="mt-8 first:mt-0">
          {collections?.map(({ href, title, image }) => (
            <Link
              className="group flex flex-col gap-4"
              key={uuidv4()}
              href={href}
            >
              <Image
                className="aspect-square rounded-lg transition-opacity group-hover:opacity-75"
                {...image}
              />
              <h3 className="font-medium">{title}</h3>
            </Link>
          ))}
        </Grid>
        <Buttons className="lg:hidden" buttons={buttons} />
      </Container>
    </Section>
  )
}

export { Collections1 }
