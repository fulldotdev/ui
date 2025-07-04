import type { BlockProps } from "@/lib/types"
import {
  Section,
  SectionContainer,
  SectionDescription,
  SectionProse,
  SectionTagline,
  SectionTitle,
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
      <SectionContainer className="max-w-screen-md lg:px-12">
        {published && (
          <SectionTagline>
            {new Date(published).toLocaleDateString("nl-NL")}
          </SectionTagline>
        )}
        {title && <SectionTitle>{title}</SectionTitle>}
        {description && (
          <SectionDescription className="mt-4">
            {description}
          </SectionDescription>
        )}
        {image && <img className="mt-8 rounded-md" {...image} />}
        <SectionProse className="not-first:mt-8">{children}</SectionProse>
      </SectionContainer>
    </Section>
  )
}
