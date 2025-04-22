import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Image } from "@/components/ui/image"
import { Paragraph } from "@/components/ui/paragraph"

export interface Media2Props extends React.ComponentProps<"section"> {
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

function Media2({
  className,
  level = 2,
  title,
  description,
  buttons,
  image,
  ...props
}: Media2Props) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="relative mx-auto grid w-full max-w-screen-xl items-center gap-y-8 px-4 md:grid-cols-2 md:gap-x-8 lg:gap-x-16 lg:px-8">
        <div className="flex flex-col items-start">
          <Heading size="4xl" level={level}>
            {title}
          </Heading>
          {description && <Paragraph className="mt-4">{description}</Paragraph>}
          {buttons && buttons.length > 0 && (
            <div className="mt-6 flex flex-row flex-wrap gap-2">
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
        </div>
        {image && <img className="rounded-lg" {...image} />}
      </div>
    </section>
  )
}

export { Media2 }
