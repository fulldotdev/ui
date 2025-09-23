import Background from "@/components/elements/background"
import { TextAnimate } from "@/components/magicui/text-animate"
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
