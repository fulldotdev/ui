import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Description } from "@/components/description"
import { Image } from "@/components/image"
import { Title } from "@/components/title"

export interface Media1Props extends React.ComponentProps<"section"> {
  level?: number
  title: string
  description?: string
  buttons?: (React.ComponentProps<typeof Button> & {
    text: string
    href: string
  })[]
  image: React.ComponentProps<typeof Image>
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
        <Title className="text-center" size="5xl" level={level}>
          {title}
        </Title>
        {description && (
          <Description className="mt-4 text-center" size="lg">
            {description}
          </Description>
        )}
        {buttons && (
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
        <Image className="mt-16 rounded-lg" {...image} />
      </div>
    </section>
  )
}

export { Media1 }
