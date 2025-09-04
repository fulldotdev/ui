import type { BlockProps } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Column } from "@/components/elements/column"
import { Container } from "@/components/elements/container"
import { Section } from "@/components/elements/section"
import { TextReveal } from "@/components/magicui/text-reveal"

export default function ({ title, description, align = "center" }: BlockProps) {
  return (
    <Section>
      <Container>
        <Column align={align}>
          {title && (
            <h2>
              <TextReveal
                className={cn("**:text-foreground **:font-semibold", {
                  "**:justify-start": align === "start",
                  "**:justify-center": align === "center",
                  "**:justify-end": align === "end",
                })}
              >
                {title}
              </TextReveal>
            </h2>
          )}
          {description && (
            <p className="not-first:mt-[-100vh]">
              <TextReveal
                className={cn(
                  "**:text-muted-foreground **:!mx-px **:text-xl **:font-normal",
                  {
                    "**:justify-start": align === "start",
                    "**:justify-center": align === "center",
                    "**:justify-end": align === "end",
                  }
                )}
              >
                {description}
              </TextReveal>
            </p>
          )}
        </Column>
      </Container>
    </Section>
  )
}
