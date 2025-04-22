import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Paragraph } from "@/components/ui/paragraph"

export interface Media1Props extends React.ComponentProps<"section"> {
  level?: number
  title: string
  description?: string
  buttons?: {
    variant?: "default" | "outline" | "secondary" | "ghost"
    text: string
    href: string
  }[]
  image: {
    src: string
    alt: string
  }
}

function Media1({
  className,
  level = 2,
  title,
  description,
  buttons,
  image,
  ...props
}: Media1Props) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center px-4 lg:px-8">
        <Heading className="text-center" size="5xl" level={level}>
          {title}
        </Heading>
        {description && (
          <Paragraph className="mt-4 text-center" size="lg">
            {description}
          </Paragraph>
        )}
        {buttons && buttons.length > 0 && (
          <div className="mt-8 flex flex-row flex-wrap gap-2">
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
        <img className="mt-16 rounded-lg" {...image} />
      </div>
    </section>
  )
}

export { Media1 }
