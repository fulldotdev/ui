import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Paragraph } from "@/components/ui/paragraph"

export interface Features1Props extends React.ComponentProps<"section"> {
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

function Features1({
  className,
  level = 2,
  title,
  description,
  buttons,
  items,
  ...props
}: Features1Props) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="mx-auto flex w-full max-w-screen-xl flex-col px-4 lg:px-8">
        <Heading size="4xl" level={level}>
          {title}
        </Heading>
        {description && <Paragraph className="mt-4">{description}</Paragraph>}
        {buttons && buttons.length > 0 && (
          <div className="mt-8 inline-flex flex-wrap gap-2">
            {buttons.map(({ text, href, ...button }, i) => (
              <Button
                key={href}
                variant={i === 0 ? "default" : "ghost"}
                asChild
                {...button}
              >
                <a href={href}>{text}</a>
              </Button>
            ))}
          </div>
        )}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-16 not-first:mt-16">
          {items.map(({ title, description }) => (
            <div key={title} className="flex max-w-md flex-col">
              <div className="bg-muted text-muted-foreground inline-flex size-9 items-center justify-center rounded-md">
                <Check className="text-primary" />
              </div>
              <Heading className="mt-4" size="lg" level={level + 1}>
                {title}
              </Heading>
              {description && (
                <Paragraph className="mt-2">{description}</Paragraph>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { Features1 }
