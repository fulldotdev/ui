import type { QuoteProps } from "@/schemas/blocks/quote"
import { cn } from "@/lib/utils"
import { TextReveal } from "@/components/magicui/text-reveal"

export default function ({ align = "center", title, description }: QuoteProps) {
  return (
    <section className="py-16">
      <div
        className={cn("container flex flex-col", {
          "items-start": align === "start",
          "items-center": align === "center",
          "items-end": align === "end",
        })}
      >
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
      </div>
    </section>
  )
}
