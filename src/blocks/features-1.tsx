import * as React from "react"
import { Check } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

import { cn } from "@/lib/utils"
import { Buttons } from "@/components/buttons"
import { Column } from "@/components/column"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Grid } from "@/components/grid"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

interface Props extends React.ComponentProps<typeof Section> {
  level?: React.ComponentProps<typeof Title>["level"]
  size?: React.ComponentProps<typeof Title>["size"]
  align?: React.ComponentProps<typeof Title>["align"]
  title?: React.ComponentProps<typeof Title>["text"]
  description?: React.ComponentProps<typeof Description>["text"]
  buttons?: React.ComponentProps<typeof Buttons>["buttons"]
  features?: {
    title?: React.ComponentProps<typeof Title>["text"]
    description?: string
  }[]
}

function Features1({
  level = 2,
  size,
  align,
  title,
  description,
  buttons,
  features,
  className,
  ...props
}: Props) {
  return (
    <Section className={cn(className)} {...props}>
      <Container>
        <Column align={align}>
          <Title level={level} size={size} align={align} text={title} />
          <Description
            className="not-first:mt-4"
            size={size}
            align={align}
            text={description}
          />
          <Buttons className="not-first:mt-8" buttons={buttons} />
          <Grid className="gap-x-4 gap-y-8 not-first:mt-16">
            {features?.map(({ title, description }) => (
              <Column className="gap-4" key={uuidv4()} align={align}>
                <div className="bg-muted text-muted-foreground inline-flex size-9 items-center justify-center rounded-md">
                  <Check />
                </div>
                <Title
                  className="text-xl"
                  level={level + 1}
                  align={align}
                  text={title}
                />
                <Description align={align} text={description} />
              </Column>
            ))}
          </Grid>
        </Column>
      </Container>
    </Section>
  )
}

export { Features1 }
