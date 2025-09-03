import type { BlockProps } from "@/lib/types"
import { Link } from "@/components/elements/link"
import {
  Container,
  Section,
  SectionContent,
  SectionFooter,
} from "@/components/elements/section"

export default function ({ children, links }: BlockProps) {
  return (
    <Section>
      <Container>
        <div className="bg-card text-card-foreground flex flex-col justify-between gap-8 rounded-lg border px-4 py-16 lg:flex-row lg:items-center lg:px-8 lg:py-24">
          {children && <SectionContent size="lg">{children}</SectionContent>}
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
      </Container>
    </Section>
  )
}
