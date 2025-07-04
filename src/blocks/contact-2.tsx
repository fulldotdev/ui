import type { BlockProps } from "@/lib/types"
import {
  Section,
  SectionContainer,
  SectionContent,
  SectionSplit,
} from "@/components/ui/section"
import { AutoForm } from "@/components/auto-form"
import { Channels } from "@/components/channels"

export default function ({ children, channels, form }: BlockProps) {
  return (
    <Section id="contact">
      <SectionContainer>
        <SectionSplit>
          <div className="mx-auto flex w-full max-w-2xl flex-col">
            {children && <SectionContent size="4xl">{children}</SectionContent>}
            {channels && <Channels className="not-first:mt-8" {...channels} />}
          </div>
          {form && <AutoForm className="mx-auto" {...form} />}
        </SectionSplit>
      </SectionContainer>
    </Section>
  )
}
