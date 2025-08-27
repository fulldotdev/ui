import type { BlockProps } from "@/lib/types"
import {
  Section,
  SectionContainer,
  SectionContent,
} from "@/components/ui/section"
import { Social } from "@/components/ui/social"
import { AutoForm } from "@/components/auto-form"

export default function ({ children, links, form }: BlockProps) {
  return (
    <Section id="contact">
      <SectionContainer className="max-w-screen-md lg:px-12">
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
        {form && <AutoForm className="not-first:mt-16" {...form} />}
      </SectionContainer>
    </Section>
  )
}
