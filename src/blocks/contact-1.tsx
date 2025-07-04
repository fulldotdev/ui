import type { BlockProps } from "@/lib/types"
import { Channel } from "@/components/ui/channel"
import {
  Section,
  SectionContainer,
  SectionContent,
} from "@/components/ui/section"
import { AutoForm } from "@/components/auto-form"

export default function ({ children, channels, form }: BlockProps) {
  return (
    <Section id="contact">
      <SectionContainer className="max-w-screen-md lg:px-12">
        {children && <SectionContent>{children}</SectionContent>}
        {channels && channels.length > 0 && (
          <div className="flex flex-col items-start gap-3 not-first:mt-8">
            {channels.map((channel, i) => (
              <Channel key={i} {...channel} />
            ))}
          </div>
        )}
        {form && <AutoForm className="not-first:mt-16" {...form} />}
      </SectionContainer>
    </Section>
  )
}
