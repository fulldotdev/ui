import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Description } from "@/components/description"
import { Image } from "@/components/image"
import { Title } from "@/components/title"

export interface Media2Props extends React.ComponentProps<"section"> {
  level?: number
  title: string
  description?: string
  buttons?: (React.ComponentProps<typeof Button> & {
    text: string
    href: string
  })[]
  image: React.ComponentProps<typeof Image>
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
          <Title size="4xl" level={level}>
            {title}
          </Title>
          {description && (
            <Description className="mt-4">{description}</Description>
          )}
          {buttons && (
            <div className="mt-8 inline-flex flex-wrap justify-center gap-2">
              {buttons?.map(({ text, href, ...button }, i) => (
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
        </div>
        {image && <Image className="rounded-lg" {...image} />}
      </div>
    </section>
  )
}

export { Media2 }
