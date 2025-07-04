import type { BlockProps } from "@/lib/types"
import { Link } from "@/components/ui/link"
import {
  Section,
  SectionContainer,
  SectionContent,
  SectionFooter,
  SectionSplit,
} from "@/components/ui/section"

export default function ({ children, links, image }: BlockProps) {
  return (
    <Section>
      <SectionContainer>
        <SectionSplit className="items-center">
          <div className="flex flex-col items-start">
            <SectionContent size="lg">{children}</SectionContent>
            {links && links.length > 0 && (
              <SectionFooter className="mt-8">
                {links.map(({ href, text }, i) => (
                  <Link
                    key={href}
                    href={href}
                    variant={i === 0 ? "default" : "ghost"}
                    size="lg"
                  >
                    {text}
                  </Link>
                ))}
              </SectionFooter>
            )}
          </div>
          {image && <img className="rounded-lg" {...image} />}
        </SectionSplit>
      </SectionContainer>
    </Section>
  )
}
