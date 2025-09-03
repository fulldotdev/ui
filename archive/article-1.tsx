import { CalendarIcon } from "lucide-react"

import type { BlockProps } from "@/lib/types"
import {
  Container,
  Section,
  SectionContent,
} from "@/components/elements/section"

export default function ({
  children,
  title,
  published,
  description,
  image,
}: BlockProps) {
  return (
    <Section>
      <Container className="flex flex-col items-center gap-16">
        <SectionContent className="text-center" size="xl">
          {published && (
            <p className="inline-flex items-center gap-2 text-sm font-medium">
              <CalendarIcon className="size-4" />
              {new Date(published).toLocaleDateString("nl-NL")}
            </p>
          )}
          {title && <h1 className="!mt-4">{title}</h1>}
          {description && <p>{description}</p>}
        </SectionContent>
        {image && <img className="max-w-5xl rounded-md" {...image} />}
        <SectionContent>{children}</SectionContent>
      </Container>
    </Section>
  )
}
