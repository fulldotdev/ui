import type { BlockProps } from "@/lib/types"
import {
  Section,
  SectionContainer,
  SectionContent,
  SectionSplit,
} from "@/components/ui/section"

export default function ({
  children,
  title,
  tagline,
  image,
  description,
}: BlockProps) {
  return (
    <Section className="pt-12">
      <SectionContainer className="max-w-screen-lg">
        <SectionSplit className="bg-muted items-center !gap-0 overflow-hidden rounded-2xl">
          <img className="aspect-square w-full object-cover" {...image} />
          <SectionContent className="flex flex-col gap-1.5 p-12">
            <p className="text-accent-foreground text-sm font-medium">
              {tagline}
            </p>
            <h1 className="not-first:!mt-3">{title}</h1>
            <p className="text-muted-foreground text-lg">{description}</p>
          </SectionContent>
        </SectionSplit>
        <SectionContent className="mx-auto not-first:mt-16">
          {children}
        </SectionContent>
      </SectionContainer>
    </Section>
  )
}
