import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Description } from "@/components/description"
import { Image } from "@/components/image"
import { Title } from "@/components/title"

export interface Hero2Props extends React.ComponentProps<"section"> {
  level?: number
  title: string
  description?: string
  buttons?: (React.ComponentProps<typeof Button> & {
    text: string
    href: string
  })[]
  image?: React.ComponentProps<typeof Image>
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
          <Title size="6xl" level={level}>
            {title}
          </Title>
          {description && (
            <Description className="mt-4" size="xl">
              {description}
            </Description>
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
        {image && <Image className="rounded-lg" {...image} />}
      </div>
    </section>
  )
}

export { Hero2 }
