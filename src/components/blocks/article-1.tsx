import { cn } from "@/lib/utils"
import Date from "@/components/elements/date"
import Image from "@/components/elements/image"
import Person from "@/components/elements/person"
import Prose from "@/components/elements/prose"
import Writeup from "@/components/elements/writeup"
import Column from "@/components/structures/column"
import Container from "@/components/structures/container"
import Section from "@/components/structures/section"

interface Props {
  size?: "sm" | "default" | "lg"
  align?: "start" | "center" | "end"
  title?: string
  description?: string
  published?: Date
  person?: React.ComponentProps<typeof Person>
  image?: React.ComponentProps<typeof Image>
  children?: React.ReactNode
}

export default function ({
  children,
  title,
  description,
  image,
  size,
  align,
  person,
  published,
}: Props) {
  return (
    <Section id="article">
      <Container className="flex max-w-screen-lg flex-col">
        <Column align={align}>
          <Date date={published} />
          <Writeup className="not-first:mt-8" size={size} align={align}>
            {title && <h1>{title}</h1>}
            {description && <p>{description}</p>}
          </Writeup>
          <Person className="not-first:mt-8" {...person} />
        </Column>
        <Image className="rounded-lg not-first:mt-16" {...image} />
        <Prose className="mx-auto not-first:mt-16" size={size}>
          {children}
        </Prose>
      </Container>
    </Section>
  )
}
