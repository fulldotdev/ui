import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Paragraph } from "@/components/ui/paragraph"

export interface Hero4Props extends React.ComponentProps<"section"> {
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

function Hero4({
  className,
  level = 1,
  title,
  description,
  buttons,
  image,
  ...props
}: Hero4Props) {
  return (
    <section
      className={cn(
        "bg-background relative flex min-h-screen items-center py-32",
        className
      )}
      {...props}
    >
      {image && (
        <img
          className="absolute top-0 left-0 size-full object-cover"
          {...image}
        />
      )}
      <div className="relative mx-auto flex w-full max-w-screen-xl flex-col justify-center px-4 lg:px-8">
        <Heading size="7xl" level={level}>
          {title}
        </Heading>
        {description && (
          <Paragraph size="xl" className="mt-4">
            {description}
          </Paragraph>
        )}
        {buttons && (
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
    </section>
  )
}

export { Hero4 }
