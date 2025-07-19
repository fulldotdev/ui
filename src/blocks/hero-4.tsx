import type { BlockProps } from "@/lib/types"
import { Link } from "@/components/ui/link"
import {
  Section,
  SectionContainer,
  SectionContent,
  SectionFooter,
} from "@/components/ui/section"

export default function ({ children, links, image }: BlockProps) {
  return (
    <Section className="flex min-h-screen items-center">
      {image?.src && (
        <img className="absolute inset-0 size-full object-cover" {...image} />
      )}
      <SectionContainer className="relative flex flex-col items-center">
        <SectionContent size="xl" className="text-center">
          {children}
        </SectionContent>
        {links && links.length > 0 && (
          <SectionFooter className="mt-8">
            {links.map(({ href, text }, i) => (
              <Link
                key={href}
                href={href}
                variant={i === 0 ? "default" : "outline"}
                size="lg"
              >
                {text}
              </Link>
            ))}
          </SectionFooter>
        )}
      </SectionContainer>
    </Section>
  )
}
