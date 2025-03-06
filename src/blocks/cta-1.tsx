import * as React from "react"

import { cn } from "@/lib/utils"
import { Buttons } from "@/components/buttons"
import { Column } from "@/components/column"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Panel } from "@/components/panel"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

interface Props extends React.ComponentProps<typeof Section> {
  level: React.ComponentProps<typeof Title>["level"]
  size?: React.ComponentProps<typeof Title>["size"]
  align?: React.ComponentProps<typeof Title>["align"]
  title?: React.ComponentProps<typeof Title>["text"]
  description?: React.ComponentProps<typeof Description>["text"]
  buttons?: React.ComponentProps<typeof Buttons>["buttons"]
}

function Cta1({
  level,
  size = "lg",
  align,
  title,
  description,
  buttons,
  children,
  className,
  ...props
}: Props) {
  return (
    <Section className={cn(className)} {...props}>
      <Container>
        <Panel>
          <Column align={align}>
            <Title level={level} size={size} align={align} text={title} />
            <Description
              className="not-first:mt-4"
              size={size}
              align={align}
              text={description}
            />
            <Buttons size={size} align={align} buttons={buttons} />
          </Column>
        </Panel>
      </Container>
    </Section>
  )
}

export { Cta1 }
