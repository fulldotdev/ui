import type { BlockProps } from "@/lib/types"
import {
  Section,
  SectionContainer,
  SectionContent,
} from "@/components/ui/section"
import { AutoForm } from "@/components/auto-form"
import { Channels } from "@/components/channels"

export default function ({ children, channels, form }: BlockProps) {
  return (
    <Section id="contact">
      <SectionContainer className="max-w-screen-md lg:px-12">
        {children && <SectionContent size="4xl">{children}</SectionContent>}
        {channels && <Channels className="not-first:mt-8" {...channels} />}
        {form && <AutoForm className="not-first:mt-16" {...form} />}
      </SectionContainer>
    </Section>
  )
}
