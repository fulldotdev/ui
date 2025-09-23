import { cn } from "@/lib/utils"
import Abstract from "@/components/elements/abstract"
import Icon from "@/components/elements/icon"
import Link from "@/components/elements/link"
import Links from "@/components/elements/links"
import Writeup from "@/components/elements/writeup"
import Column from "@/components/structures/column"
import Container from "@/components/structures/container"
import Grid from "@/components/structures/grid"
import Section from "@/components/structures/section"

interface Props {
  size?: "sm" | "default" | "lg"
  align?: "start" | "center" | "end"
  children?: React.ReactNode
  links?: React.ComponentProps<typeof Links>["links"]
  blocks?: {
    title?: string
    href?: string
  }[]
}

export default function ({ align, size, children, links, blocks }: Props) {
  return (
    <Section id="blocks">
      <Container>
        <Column align={align}>
          <Writeup className="not-first:mt-4" size={size} align={align}>
            {children}
          </Writeup>
          <Links
            className="not-first:mt-8"
            size={size}
            links={links}
            align={align}
          />
          {blocks && blocks.length > 0 && (
            <Grid size="sm" className="gap-x-16 gap-y-8 not-first:mt-16">
              {blocks?.map(({ title, href }, i) => (
                <a
                  className="text-foreground text-xl hover:underline"
                  key={i}
                  href={href}
                >
                  {title}
                </a>
              ))}
            </Grid>
          )}
        </Column>
      </Container>
    </Section>
  )
}
