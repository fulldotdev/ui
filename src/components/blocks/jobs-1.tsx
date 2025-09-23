import Abstract from "@/components/elements/abstract"
import Links from "@/components/elements/links"
import List from "@/components/elements/list"
import Writeup from "@/components/elements/writeup"
import Column from "@/components/structures/column"
import Container from "@/components/structures/container"
import Section from "@/components/structures/section"

interface Props {
  size?: "sm" | "default" | "lg"
  align?: "start" | "center" | "end"
  children?: React.ReactNode
  links?: React.ComponentProps<typeof Links>["links"]
  jobs?: {
    href?: string
    title?: string
    description?: string
    published?: Date
    location?: string
    salary?: string
    hours?: string
  }[]
}

export default function ({ align, children, jobs, size, links }: Props) {
  return (
    <Section>
      <Container className="max-w-screen-md">
        <Column align={align}>
          <Writeup size={size} align={align}>
            {children}
          </Writeup>
          <Links
            className="not-first:mt-8"
            size={size}
            links={links}
            align={align}
          />
          {jobs && jobs.length > 0 && (
            <div className="flex w-full flex-col gap-4 not-first:mt-12">
              {jobs.map(
                ({ href, title, description, location, salary, hours }, i) => {
                  return (
                    <a
                      key={i}
                      className="group bg-card hover:bg-accent relative overflow-hidden rounded-lg border p-6 transition-colors"
                      href={href}
                    >
                      <Abstract
                        title={title}
                        description={description}
                        size={size}
                      />
                      <List
                        className="not-first:mt-4"
                        list={[location, salary, hours]}
                      />
                    </a>
                  )
                }
              )}
            </div>
          )}
        </Column>
      </Container>
    </Section>
  )
}
