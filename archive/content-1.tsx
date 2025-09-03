import type { BlockProps } from "@/lib/types"
import { Link } from "@/components/elements/link"
import {
  Container,
  Section,
  SectionContent,
  SectionFooter,
  SectionSplit,
} from "@/components/elements/section"

export default function ({ children, links, image }: BlockProps) {
  return (
    <Section>
      <Container>
        <SectionSplit className="items-center">
          <div className="flex flex-col items-start">
            {children && <SectionContent>{children}</SectionContent>}
            {links && links.length > 0 && (
              <SectionFooter className="not-first:mt-6">
                {links?.map(({ text, href, ...link }, i) => (
                  <Link
                    key={i}
                    href={href}
                    variant={i === 0 ? "outline" : "ghost"}
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
      </Container>
    </Section>
  )
}
