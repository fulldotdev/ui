import { CalendarIcon } from "lucide-react"

import type { BlockProps } from "@/lib/types"
import {
  Section,
  SectionContainer,
  SectionContent,
} from "@/components/ui/section"

export default function ({
  children,
  title,
  published,
  description,
  image,
}: BlockProps) {
  return (
    <Section>
      {image?.src && (
        <img
          {...image}
          className="mask-linear absolute top-0 left-0 -z-10 h-auto max-h-[400px] w-full mask-b-from-black/30 mask-b-to-transparent object-cover"
        />
      )}
      <SectionContainer className="flex flex-col items-center gap-16">
        <SectionContent className="text-center" size="lg">
          {published && (
            <p className="inline-flex items-center gap-2 text-sm font-medium">
              <CalendarIcon className="size-4" />
              {new Date(published).toLocaleDateString("nl-NL")}
            </p>
          )}
          {title && <h1 className="!mt-4">{title}</h1>}
          {description && <p>{description}</p>}
        </SectionContent>
        <SectionContent>{children}</SectionContent>
      </SectionContainer>
    </Section>
  )
}
