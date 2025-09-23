import { cn } from "@/lib/utils"
import Background from "@/components/elements/background"
import { TextReveal } from "@/components/magicui/text-reveal"
import Column from "@/components/structures/column"
import Container from "@/components/structures/container"
import Section from "@/components/structures/section"

interface Props {
  align?: "start" | "center" | "end"
  background?: React.ComponentProps<typeof Background>["variant"]
  title?: string
  description?: string
}

export default function ({ align, background, title, description }: Props) {
  return (
    <Section id="quote">
      <Background
        className="mask-y-from-white mask-y-from-75% mask-y-to-transparent"
        variant={background}
      />
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
