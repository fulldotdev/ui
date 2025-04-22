import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Description } from "@/components/description"
import { Title } from "@/components/title"

export interface Locations1Props extends React.ComponentProps<"section"> {
  level?: number
  title: string
  description?: string
  buttons?: (React.ComponentProps<typeof Button> & {
    text: string
    href: string
  })[]
  items?: {
    href: string
    title: string
    description: string
  }[]
}

function Locations1({
  className,
  level = 2,
  title,
  description,
  buttons,
  items,
  ...props
}: Locations1Props) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="mx-auto w-full max-w-screen-md px-4 lg:px-8">
        <div className="flex flex-col">
          <Title size="4xl" level={level}>
            {title}
          </Title>
          {description && (
            <Description className="not-first:mt-4">{description}</Description>
          )}
          {buttons && buttons.length > 0 && (
            <div className="inline-flex flex-wrap gap-2 not-first:mt-8">
              {buttons.map(({ text, href, ...button }, i) => (
                <Button
                  key={text}
                  variant={i === 0 ? "default" : "outline"}
                  asChild
                  {...button}
                >
                  <a href={href}>{text}</a>
                </Button>
              ))}
            </div>
          )}
          {items && items.length > 0 && (
            <div className="flex flex-col gap-4 not-first:mt-16">
              {items.map(({ href, title, description }) => (
                <a
                  className="hover:bg-muted/50 flex flex-col items-start gap-4 rounded-lg border p-6 transition-colors"
                  key={href}
                  href={href}
                >
                  <Title level={level + 1}>{title}</Title>
                  <Description>{description}</Description>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export { Locations1 }
