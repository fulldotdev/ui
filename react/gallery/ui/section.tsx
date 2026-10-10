import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Section,
  SectionContainer,
  SectionDescription,
  SectionTitle,
  sectionVariants,
} from "@/components/ui/section"

function Example({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
      <div className="flex flex-wrap items-start gap-4">{children}</div>
    </section>
  )
}

export default function Demo() {
  return (
    <div className="flex flex-col gap-10 py-6">
      <Example title="Default">
        <Section>
          <SectionContainer className="flex flex-col gap-6">
            <div className="flex max-w-2xl flex-col gap-3">
              <p className="text-sm font-medium text-primary">
                Launch checklist
              </p>
              <SectionTitle>Plan the next release</SectionTitle>
              <SectionDescription>
                Keep copy, actions, and supporting details aligned in one
                predictable section.
              </SectionDescription>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button>Review plan</Button>
              <Button variant="outline">Open docs</Button>
            </div>
          </SectionContainer>
        </Section>
      </Example>
      <Example title="Floating">
        <Section variant="floating">
          <SectionContainer className="flex flex-col gap-4">
            <SectionTitle render={<h3 />}>
              A quieter layout for long-form copy
            </SectionTitle>
            <SectionDescription>
              Floating sections frame a focused slice of content without
              changing the page width.
            </SectionDescription>
          </SectionContainer>
        </Section>
      </Example>
      <Example title="Variant classes on another element">
        <div className={sectionVariants({ variant: "floating" })}>
          <SectionContainer>
            <p className="text-sm text-muted-foreground">
              sectionVariants applies the section styling to any element.
            </p>
          </SectionContainer>
        </div>
      </Example>
    </div>
  )
}
