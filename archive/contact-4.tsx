import type { BlockProps } from "@/lib/types"
import { AutoForm } from "@/components/auto-form"
import {
  Container,
  Section,
  SectionContent,
  SectionGrid,
} from "@/components/elements/section"
import { Social } from "@/components/elements/social"

export default function ({ children, links, form, image }: BlockProps) {
  return (
    <Section id="contact">
      {image?.src && (
        <img
          {...image}
          className="mask-linear absolute top-0 left-0 -z-10 h-auto max-h-[400px] w-full mask-b-from-black/30 mask-b-to-transparent object-cover"
        />
      )}
      <Container className="flex flex-col items-center">
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
      </Container>
    </Section>
  )
}
