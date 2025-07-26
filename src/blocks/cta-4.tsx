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
    <Section className="bg-primary py-24">
      <SectionContainer className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {children && (
          <SectionContent
            className="**:!text-primary-foreground max-w-2xl"
            size="lg"
          >
            {children}
          </SectionContent>
        )}
        {links && (
          <SectionFooter>
            {links?.map(({ href, text }, i) => (
              <Link
                className={
                  i === 0
                    ? "bg-primary-foreground hover:bg-primary-foreground/80 !text-primary"
                    : "!text-primary-foreground bg-primary hover:!bg-accent/20"
                }
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
      </SectionContainer>
    </Section>
  )
}
