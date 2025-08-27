import type { BlockProps } from "@/lib/types"
import {
  Section,
  SectionContainer,
  SectionContent,
  SectionGrid,
} from "@/components/ui/section"
import { Social } from "@/components/ui/social"
import { AutoForm } from "@/components/auto-form"

export default function ({ children, links, form, image }: BlockProps) {
  return (
    <Section id="contact">
      {image?.src && (
        <img
          {...image}
          className="mask-linear absolute top-0 left-0 -z-10 h-auto max-h-[400px] w-full mask-b-from-black/30 mask-b-to-transparent object-cover"
        />
      )}
      <SectionContainer className="flex flex-col items-center">
        {children && (
          <SectionContent className="text-center" size="lg">
            {children}
          </SectionContent>
        )}
        {links && links.length > 0 && (
          <SectionGrid className="not-first:mt-16">
            {links.map((link, i) => (
              <div
                className="bg-card flex flex-col items-center gap-4 rounded-md border p-6 text-center text-sm"
                key={i}
              >
                <Social variant="outline" href={link.href} />
                {link.text}
              </div>
            ))}
          </SectionGrid>
        )}
        {form && <AutoForm className="not-first:mt-16" {...form} />}
      </SectionContainer>
    </Section>
  )
}
