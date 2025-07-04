import type { BlockProps } from "@/lib/types"
import { Link } from "@/components/ui/link"
import {
  Section,
  SectionContainer,
  SectionContent,
  SectionFooter,
} from "@/components/ui/section"

export default function ({ children, links }: BlockProps) {
  return (
    <Section>
      <SectionContainer>
        <div className="bg-card text-card-foreground flex flex-col justify-between gap-8 rounded-lg border px-4 py-16 md:flex-row md:items-center lg:px-8 lg:py-24">
          {children && <SectionContent size="5xl">{children}</SectionContent>}
          {links && (
            <SectionFooter>
              {links?.map(({ href, text }, i) => (
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
      </SectionContainer>
    </Section>
  )
}
