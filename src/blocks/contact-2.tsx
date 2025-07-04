import type { BlockProps } from "@/lib/types"
import { Channel } from "@/components/ui/channel"
import {
  Section,
  SectionContainer,
  SectionContent,
  SectionSplit,
} from "@/components/ui/section"
import { AutoForm } from "@/components/auto-form"

export default function ({ children, channels, form }: BlockProps) {
  return (
    <Section id="contact">
      <SectionContainer>
        <SectionSplit>
          <div className="mx-auto flex w-full max-w-2xl flex-col">
            {children && <SectionContent>{children}</SectionContent>}
            {channels && channels.length > 0 && (
              <div className="flex flex-col items-start gap-3 not-first:mt-8">
                {channels.map((channel, i) => (
                  <Channel key={i} {...channel} />
                ))}
              </div>
            )}
          </div>
          {form && <AutoForm className="mx-auto" {...form} />}
        </SectionSplit>
      </SectionContainer>
    </Section>
  )
}
