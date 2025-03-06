import * as React from "react"
import { v4 as uuidv4 } from "uuid"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Abstract } from "@/components/abstract"
import { Buttons } from "@/components/buttons"
import { Column } from "@/components/column"
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
  persons?: {
    href?: string
    title?: string
    description?: string
    image?: React.ComponentProps<typeof Image>
  }[]
}

function Persons1({
  level,
  size,
  align,
  title,
  description,
  buttons,
  persons,
  children,
  className,
  ...props
}: Props) {
  return (
    <Section className={cn("persons persons-1", className)} {...props}>
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
        <Buttons size={size} align={align} buttons={buttons} />
        <Grid className="mt-8 gap-16 first:mt-0">
          {persons?.map(({ href, image, title, description }) => (
            <Link className="max-w-md" key={uuidv4()} href={href}>
              <Column className="gap-6" align={align}>
                <Image
                  className="aspect-square w-full max-w-60 rounded-full object-cover"
                  {...image}
                />
                <Abstract
                  align={align}
                  level={level}
                  size={size}
                  title={title}
                  description={description}
                />
              </Column>
            </Link>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}

export { Persons1 }
