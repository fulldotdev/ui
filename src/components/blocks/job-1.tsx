import Date from "@/components/elements/date"
import Links from "@/components/elements/links"
import List from "@/components/elements/list"
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
  location?: string
  salary?: string
  hours?: string
  links?: React.ComponentProps<typeof Links>["links"]
  children?: React.ReactNode
}

export default function ({
  children,
  title,
  description,
  size,
  align,
  location,
  salary,
  hours,
  published,
  links,
}: Props) {
  return (
    <Section id="article">
      <Container className="max-w-screen-md">
        <Column align={align}>
          <Date date={published} />
          <Writeup className="not-first:mt-6" size={size} align={align}>
            {title && <h1>{title}</h1>}
            {description && <p>{description}</p>}
          </Writeup>
          <List className="not-first:mt-6" list={[location, salary, hours]} />
          <Links className="not-first:mt-6" size={size} links={links} />
          <Prose className="not-first:mt-16" size={size}>
            {children}
          </Prose>
        </Column>
      </Container>
    </Section>
  )
}
