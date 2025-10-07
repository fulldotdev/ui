import * as React from "react"

import { cn } from "@/lib/utils"
import Abstract from "@/components/elements/abstract"
import Container from "@/components/elements/container"
import Form from "@/components/elements/form"
import Links from "@/components/elements/links"
import Panel from "@/components/elements/panel"
import Section from "@/components/elements/section"
import Social from "@/components/elements/social"
import Split from "@/components/elements/split"
import Writeup from "@/components/elements/writeup"

interface Props extends React.ComponentProps<typeof Section> {
  links?: React.ComponentProps<typeof Links>["links"]
  channels?: {
    text?: string
    href?: string
  }[]
  form?: any
}

export default function ({
  className,
  align,
  size,
  links,
  channels,
  form,
  children,
  ...props
}: Props) {
  return (
    <Section className={cn("", className)} size={size} align={align} {...props}>
      <Container>
        <Panel>
          <Split align={align}>
            <div className="flex flex-col items-start">
              <Writeup className="max-w-3xl" size={size}>
                {children}
              </Writeup>
              <Links
                className="not-first:mt-8 not-last:mb-4"
                size={size}
                links={links}
              />
              {channels && channels.length > 0 && (
                <div className="flex flex-col items-start gap-4 not-first:mt-12">
                  {channels?.map(({ text, href }, i) => (
                    <div className="flex items-center gap-4" key={i}>
                      <Social variant="secondary" size={size} href={href} />
                      <Abstract size={size} align={align}>
                        {text}
                      </Abstract>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Form {...form} />
          </Split>
        </Panel>
      </Container>
    </Section>
  )
}
