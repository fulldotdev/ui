import { cn } from "@/lib/utils"
import Date from "@/components/elements/date"
import Image from "@/components/elements/image"
import Person from "@/components/elements/person"
import Prose from "@/components/elements/prose"
import Writeup from "@/components/elements/writeup"
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
      <Container>
        <div className="container flex flex-col items-center gap-16">
          <div
            className={cn("flex max-w-5xl flex-col", {
              "items-start text-start": align === "start",
              "items-center text-center": align === "center",
              "items-end text-end": align === "end",
            })}
          >
            <Date date={published} />
            <Writeup className="not-first:mt-8" size={size} align={align}>
              {title && <h1>{title}</h1>}
              {description && <p>{description}</p>}
            </Writeup>
            <Person className="not-first:mt-8" {...person} />
            <Image className="rounded-lg not-first:mt-16" {...image} />
          </div>
          <Prose size={size}>{children}</Prose>
        </div>
      </Container>
    </Section>
  )
}
