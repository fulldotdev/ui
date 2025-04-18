import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Description } from "@/components/description"
import { Image } from "@/components/image"
import { Title } from "@/components/title"

export interface Hero5Props extends React.ComponentProps<"section"> {
  level?: number
  title: string
  description?: string
  buttons?: (React.ComponentProps<typeof Button> & {
    text: string
    href: string
  })[]
  image?: React.ComponentProps<typeof Image>
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
        <Title className="max-w-4xl text-balance" size="6xl" level={level}>
          {title}
        </Title>
        {description && (
          <Description className="max-w-xl not-first:mt-4" size="xl">
            {description}
          </Description>
        )}
        {buttons && (
          <div className="inline-flex flex-wrap justify-start gap-2 not-first:mt-8">
            {buttons.map(({ text, href, ...button }, i) => (
              <Button
                key={text}
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
        {image && <Image className="rounded-lg not-first:mt-16" {...image} />}
      </div>
    </section>
  )
}

export { Hero5 }
