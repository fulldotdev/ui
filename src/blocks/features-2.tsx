import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Paragraph } from "@/components/ui/paragraph"

export interface Features2Props extends React.ComponentProps<"section"> {
  level?: number
  title: string
  description?: string
  buttons?: {
    variant?: "default" | "outline" | "secondary" | "ghost"
    text: string
    href: string
  }[]
  items: {
    title: string
    description?: string
  }[]
}

function Features2({
  className,
  level = 2,
  title,
  description,
  buttons,
  items,
  ...props
}: Features2Props) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center px-4 lg:px-8">
        <Heading className="text-center" size="4xl" level={level}>
          {title}
        </Heading>
        {description && (
          <Paragraph className="mt-4 text-center">{description}</Paragraph>
        )}
        {buttons && buttons.length > 0 && (
          <div className="mt-8 inline-flex flex-wrap justify-center gap-2">
            {buttons.map(({ text, href, ...button }, i) => (
              <Button
                key={href}
                variant={i === 0 ? "default" : "ghost"}
                size="lg"
                asChild
                {...button}
              >
                <a href={href}>{text}</a>
              </Button>
            ))}
          </div>
        )}
        <div className="mt-16 flex flex-wrap justify-center gap-16">
          {items.map(({ title, description }) => (
            <div
              key={title}
              className="flex max-w-md min-w-2xs grow-1 basis-xs flex-col items-center"
            >
              <div className="bg-muted text-muted-foreground inline-flex size-9 items-center justify-center rounded-md">
                <Check className="text-primary" />
              </div>
              <Heading className="mt-4 text-center" size="xl" level={level + 1}>
                {title}
              </Heading>
              {description && (
                <Paragraph className="mt-2 text-center">
                  {description}
                </Paragraph>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { Features2 }
