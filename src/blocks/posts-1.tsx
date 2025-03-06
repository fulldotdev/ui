import * as React from "react"
import { v4 as uuidv4 } from "uuid"

import { cn } from "@/lib/utils"
import { Abstract } from "@/components/abstract"
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
  posts?: {
    href?: React.ComponentProps<typeof Link>["href"]
    title?: string
    image?: React.ComponentProps<typeof Image>
  }[]
}

function Posts1({
  level,
  size,
  align,
  title,
  description,
  buttons,
  posts,
  children,
  className,
  ...props
}: Props) {
  return (
    <Section className={cn("posts posts-1", className)} {...props}>
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
        <Buttons buttons={buttons} />
        <Grid className="mt-8 gap-x-4 gap-y-8 first:mt-0" size="lg">
          {posts?.map(({ href, title, image }) => (
            <Link
              className="group flex flex-col gap-3"
              key={uuidv4()}
              href={href}
            >
              <Image
                className="bg-card rounded-lg object-contain transition-opacity group-hover:opacity-75"
                {...image}
              />
              <Abstract level={level} size={size} title={title} />
            </Link>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}

export { Posts1 }
