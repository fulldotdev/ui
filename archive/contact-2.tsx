import type { BlockProps } from "@/lib/types"
import { AutoForm } from "@/components/auto-form"
import {
  Container,
  Section,
  SectionContent,
  SectionSplit,
} from "@/components/elements/section"
import { Social } from "@/components/elements/social"

export default function ({ children, links, form }: BlockProps) {
  return (
    <Section id="contact">
      <Container>
        <SectionSplit>
          <div className="mx-auto flex w-full max-w-2xl flex-col">
            {children && <SectionContent>{children}</SectionContent>}
            {links && links.length > 0 && (
              <div className="flex flex-col items-start gap-2 not-first:mt-8">
                {links.map((link, i) => (
                  <div className="flex items-center gap-3 text-sm" key={i}>
                    <Social variant="secondary" href={link.href} />
                    {link.text}
                  </div>
                ))}
              </div>
            )}
          </div>
          {form && <AutoForm className="mx-auto" {...form} />}
        </SectionSplit>
      </Container>
    </Section>
  )
}
