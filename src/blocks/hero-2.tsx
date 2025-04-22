import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Paragraph } from "@/components/ui/paragraph"

export interface Hero2Props extends React.ComponentProps<"section"> {
  level?: number
  title: string
  description?: string
  buttons?: {
    variant?: "default" | "outline" | "secondary" | "ghost"
    text: string
    href: string
  }[]
  image?: {
    src: string
    alt: string
  }
}

function Hero2({
  className,
  level = 1,
  title,
  description,
  buttons,
  image,
  ...props
}: Hero2Props) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="relative mx-auto grid w-full max-w-screen-xl items-center gap-12 gap-y-8 px-4 md:gap-x-8 lg:grid-cols-2 lg:gap-x-16 lg:px-8">
        <div className="flex flex-col items-start">
          <Heading size="6xl" level={level}>
            {title}
          </Heading>
          {description && (
            <Paragraph className="mt-4" size="xl">
              {description}
            </Paragraph>
          )}
          {buttons && buttons.length > 0 && (
            <div className="mt-8 inline-flex flex-wrap gap-2">
              {buttons.map(({ href, text, ...button }, i) => (
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
        </div>
        {image && <img className="rounded-lg" {...image} />}
      </div>
    </section>
  )
}

export { Hero2 }
