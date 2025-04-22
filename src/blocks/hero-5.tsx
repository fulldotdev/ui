import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Paragraph } from "@/components/ui/paragraph"

export interface Hero5Props extends React.ComponentProps<"section"> {
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

function Hero5({
  className,
  level = 1,
  title,
  description,
  buttons,
  image,
  ...props
}: Hero5Props) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-start px-4 lg:px-8">
        <Heading className="max-w-4xl text-balance" size="6xl" level={level}>
          {title}
        </Heading>
        {description && (
          <Paragraph className="mt-4 max-w-xl" size="xl">
            {description}
          </Paragraph>
        )}
        {buttons && (
          <div className="mt-8 inline-flex flex-wrap justify-start gap-2">
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
        {image && <img className="mt-16 rounded-lg" {...image} />}
      </div>
    </section>
  )
}

export { Hero5 }
