import * as React from "react"

import { cn } from "@/lib/utils"
import Abstract from "@/components/elements/abstract"
import Column from "@/components/elements/column"
import Container from "@/components/elements/container"
import Grid from "@/components/elements/grid"
import Icon from "@/components/elements/icon"
import Link from "@/components/elements/link"
import Links from "@/components/elements/links"
import Section from "@/components/elements/section"
import Writeup from "@/components/elements/writeup"

interface Props extends React.ComponentProps<typeof Section> {
  links?: React.ComponentProps<typeof Links>["links"]
  features?: {
    title?: string
    description?: string
    icon?: string
    link?: React.ComponentProps<typeof Link>
  }[]
}

export default function ({
  className,
  align,
  size,
  links,
  features,
  children,
  ...props
}: Props) {
  return (
    <Section className={cn("", className)} size={size} align={align} {...props}>
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
          {features && features.length > 0 && (
            <Grid className="gap-x-16 gap-y-8 not-first:mt-16">
              {features?.map(({ title, description, icon, link }, i) => (
                <Column key={i} align={align}>
                  {icon && (
                    <div className="bg-accent rounded-full p-2">
                      <Icon name={icon} />
                    </div>
                  )}
                  <Abstract
                    className="not-first:mt-6"
                    size={size}
                    align={align}
                  >
                    {title && <h3>{title}</h3>}
                    {description && <p>{description}</p>}
                  </Abstract>
                  <Link
                    className="px-0 not-first:mt-2"
                    variant="link"
                    size={size}
                    {...link}
                  />
                </Column>
              ))}
            </Grid>
          )}
        </Column>
      </Container>
    </Section>
  )
}
