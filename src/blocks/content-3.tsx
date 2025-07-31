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
        <SectionSplit sticky={true}>
          <div className="flex flex-col items-start">
            {children && <SectionContent>{children}</SectionContent>}
            {links && links.length > 0 && (
              <SectionFooter className="not-first:mt-6">
                {links?.map(({ text, href, ...link }, i) => (
                  <Link
                    key={i}
                    href={href}
                    variant={i === 0 ? "secondary" : "ghost"}
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
