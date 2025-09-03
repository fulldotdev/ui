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
    <Section className="bg-primary py-24">
      <Container className="flex flex-col items-center gap-8">
        {children && (
          <SectionContent
            className="**:!text-primary-foreground text-center"
            size="xl"
          >
            {children}
          </SectionContent>
        )}
        {links && links.length > 0 && (
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
      </Container>
    </Section>
  )
}
