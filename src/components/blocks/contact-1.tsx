import { cn } from "@/lib/utils"
import Abstract from "@/components/elements/abstract"
import Form from "@/components/elements/form"
import Icon from "@/components/elements/icon"
import Links from "@/components/elements/links"
import Writeup from "@/components/elements/writeup"
import Column from "@/components/structures/column"
import Container from "@/components/structures/container"
import Grid from "@/components/structures/grid"
import Section from "@/components/structures/section"

import Social from "../elements/social"

interface Props {
  size?: "sm" | "default" | "lg"
  align?: "start" | "center" | "end"
  form?: any
  children?: React.ReactNode
  channels?: {
    text?: string
    href?: string
    icon?: string
  }[]
}

export default function ({
  align = "center",
  children,
  form,
  size,
  channels,
}: Props) {
  return (
    <Section id="contact">
      <Container className="max-w-screen-md">
        <Column align={align}>
          <Writeup
            className={cn({
              "text-start": align === "start",
              "text-center": align === "center",
              "text-end": align === "end",
            })}
            size={size}
          >
            {children}
          </Writeup>
          {channels && channels.length > 0 && (
            <Grid size="sm" className="not-first:mt-16">
              {channels?.map(({ text, href }, i) => (
                <Column key={i} align={align}>
                  <Social variant="secondary" size={size} href={href} />
                  <Abstract
                    className="not-first:mt-4"
                    size={size}
                    align={align}
                  >
                    {text}
                  </Abstract>
                </Column>
              ))}
            </Grid>
          )}
          <Form className="not-first:mt-16" {...form} />
        </Column>
      </Container>
    </Section>
  )
}
