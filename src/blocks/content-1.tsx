import type { BlockProps } from "@/lib/types"
import { Link } from "@/components/ui/link"
import {
  Section,
  SectionContainer,
  SectionContent,
  SectionFooter,
  SectionSplit,
} from "@/components/ui/section"

export default function ({ children, links, image, reverse }: BlockProps) {
  return (
    <Section>
      <SectionContainer>
        <SectionSplit className="items-center" reverse={reverse}>
          <div className="flex flex-col items-start">
            {children && <SectionContent size="4xl">{children}</SectionContent>}
            {links && links.length > 0 && (
              <SectionFooter className="not-first:mt-6">
                {links?.map(({ text, href, ...link }, i) => (
                  <Link
                    key={href}
                    href={href}
                    variant={i === 0 ? "default" : "ghost"}
                    {...link}
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
