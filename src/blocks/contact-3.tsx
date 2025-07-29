import type { BlockProps } from "@/lib/types"
import { Channel } from "@/components/ui/channel"
import {
  Section,
  SectionContainer,
  SectionContent,
  SectionSplit,
} from "@/components/ui/section"
import { Social } from "@/components/ui/social"
import { AutoForm } from "@/components/auto-form"

export default function ({ children, channels, form }: BlockProps) {
  return (
    <Section id="contact">
      <SectionContainer>
        <div className="bg-muted rounded-2xl">
          <SectionContainer className="py-16">
            <SectionSplit>
              <div className="mx-auto flex w-full max-w-2xl flex-col">
                {children && <SectionContent>{children}</SectionContent>}
                {channels && channels.length > 0 && (
                  <div className="flex flex-col items-start gap-2 not-first:mt-8">
                    {channels.map((channel, i) => (
                      <div className="flex items-center gap-3 text-sm" key={i}>
                        <Social variant="secondary" href={channel.href} />
                        {channel.text}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {form && <AutoForm className="mx-auto" {...form} />}
            </SectionSplit>
          </SectionContainer>
        </div>
      </SectionContainer>
    </Section>
  )
}
