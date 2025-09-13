import type { QuoteProps } from "@/schemas/blocks/quote"
import { cn } from "@/lib/utils"
import { Background } from "@/components/elements/background"
import { TextAnimate } from "@/components/magicui/text-animate"

export default function ({
  align = "center",
  background,
  title,
  description,
}: QuoteProps) {
  return (
    <section className="relative py-16">
      <Background
        className="mask-y-from-white mask-y-from-75% mask-y-to-transparent"
        variant={background}
      />
      <div
        className={cn("container text-balance", {
          "text-start": align === "start",
          "text-center": align === "center",
          "text-end": align === "end",
        })}
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
      </div>
    </section>
  )
}
