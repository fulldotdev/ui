import * as React from "react"
import { Check } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

import { cn } from "@/lib/utils"
import { Abstract } from "@/components/abstract"
import { Buttons } from "@/components/buttons"
import { Column } from "@/components/column"
import { Container } from "@/components/container"
import { Grid } from "@/components/grid"
import { Section } from "@/components/section"
import { Writeup } from "@/components/writeup"

interface Props extends React.ComponentProps<typeof Section> {
  level?: React.ComponentProps<typeof Writeup>["level"]
  size?: React.ComponentProps<typeof Writeup>["size"]
  align?: React.ComponentProps<typeof Writeup>["align"]
  title?: React.ComponentProps<typeof Writeup>["title"]
  description?: React.ComponentProps<typeof Writeup>["description"]
  buttons?: React.ComponentProps<typeof Buttons>["buttons"]
  features?: {
    title?: string
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
  children,
  className,
  ...props
}: Props) {
  return (
    <Section className={cn("features features-1", className)} {...props}>
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
        <Grid className="mt-8 gap-x-4 gap-y-8 first:mt-0">
          {features?.map(({ title, description }) => (
            <Column className="gap-4" key={uuidv4()} align={align}>
              <div className="bg-muted text-muted-foreground inline-flex size-9 items-center justify-center rounded-md">
                <Check />
              </div>
              <Abstract
                level={level}
                align={align}
                title={title}
                description={description}
              />
            </Column>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}

export { Features1 }
