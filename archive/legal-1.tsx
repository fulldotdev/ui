import type { BlockProps } from "@/lib/types"
import { Container, Section } from "@/components/elements/section"

export default function ({ title, links }: BlockProps) {
  return (
    <Section className="py-0">
      <Container>
        <div className="flex flex-col flex-wrap items-start justify-between gap-x-6 gap-y-4 border-t py-8 md:flex-row md:items-center">
          {title && (
            <p className="text-muted-foreground mr-auto text-xs">
              © {new Date().getFullYear()} {title}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {links?.map(({ text, href }, i) => (
              <a
                className="text-muted-foreground hover:text-foreground text-xs transition-colors"
                key={i}
                href={href}
              >
                {text}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
