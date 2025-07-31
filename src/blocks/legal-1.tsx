import type { BlockProps } from "@/lib/types"
import { Section, SectionContainer } from "@/components/ui/section"

export default function ({ title, links }: BlockProps) {
  return (
    <Section className="py-8">
      <SectionContainer className="flex flex-col flex-wrap items-start justify-between gap-x-6 gap-y-4 border-t md:flex-row md:items-center">
        {title && (
          <p className="text-muted-foreground mr-auto text-xs">
            © {new Date().getFullYear()} {title}
          </p>
        )}
        <div className="ml-auto flex flex-wrap items-center gap-x-4 gap-y-1">
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
      </SectionContainer>
    </Section>
  )
}
