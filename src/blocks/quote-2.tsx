import type { BlockProps } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Background } from "@/components/elements/background"
import { Column } from "@/components/elements/column"
import { Container } from "@/components/elements/container"
import { Section } from "@/components/elements/section"
import { TextAnimate } from "@/components/magicui/text-animate"

export default function ({
  title,
  description,
  background,
  align = "center",
}: BlockProps) {
  return (
    <Section className="relative">
      <Background
        className="mask-y-from-white mask-y-from-75% mask-y-to-transparent"
        variant={background}
      />
      <Container>
        <Column
          align={align}
          className={cn("text-balance", { "text-center": align === "center" })}
        >
          {title && (
            <h2 className="text-4xl font-semibold">
              <TextAnimate by="word">{title}</TextAnimate>
            </h2>
          )}
          {description && (
            <p className="text-muted-foreground mt-4 text-lg">
              <TextAnimate by="word" delay={0.4}>
                {description}
              </TextAnimate>
            </p>
          )}
        </Column>
      </Container>
    </Section>
  )
}
