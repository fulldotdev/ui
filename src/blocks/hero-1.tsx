import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Description } from "@/components/description"
import { Image } from "@/components/image"
import { Title } from "@/components/title"

export interface Hero1Props extends React.ComponentProps<"section"> {
  level?: number
  title: string
  description?: string
  buttons?: (React.ComponentProps<typeof Button> & {
    text: string
    href: string
  })[]
  image?: React.ComponentProps<typeof Image>
}

function Hero1({
  className,
  level = 1,
  title,
  description,
  buttons,
  image,
  ...props
}: Hero1Props) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center px-4 lg:px-8">
        <Title
          className="max-w-4xl text-center text-balance"
          size="7xl"
          level={level}
        >
          {title}
        </Title>
        {description && (
          <Description className="mt-4 max-w-xl text-center" size="xl">
            {description}
          </Description>
        )}
        {buttons && (
          <div className="mt-8 inline-flex flex-wrap justify-center gap-2">
            {buttons.map(({ href, text, ...button }, i) => (
              <Button
                key={href}
                variant={i === 0 ? "default" : "outline"}
                size="lg"
                asChild
                {...button}
              >
                <a href={href}>{text}</a>
              </Button>
            ))}
          </div>
        )}
        {image && <Image className="mt-16 rounded-lg" {...image} />}
      </div>
    </section>
  )
}

export { Hero1 }
