import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Description } from "@/components/description"
import { Image } from "@/components/image"
import { Link } from "@/components/link"
import { Money } from "@/components/money"
import { Price } from "@/components/price"
import { Title } from "@/components/title"

export interface Collection1Props extends React.ComponentProps<"section"> {
  level?: number
  title: string
  description?: string
  buttons?: (React.ComponentProps<typeof Button> & {
    text: string
    href: string
  })[]
  items?: {
    image: React.ComponentProps<typeof Image>
    href: string
    title: string
    price?: number
  }[]
}

function Collection1({
  className,
  id,
  level = 2,
  title,
  description,
  buttons,
  items,
  ...props
}: Collection1Props) {
  return (
    <section
      className={cn("relative w-full py-16", className)}
      id={id}
      {...props}
    >
      <div className="mx-auto w-full max-w-screen-xl px-4 lg:px-8">
        <div className="flex flex-col">
          <Title level={level} size="3xl">
            {title}
          </Title>
          {description && (
            <Description className="not-first:mt-4">{description}</Description>
          )}
          {buttons && buttons.length > 0 && (
            <div className="inline-flex flex-wrap gap-2 not-first:mt-8 max-sm:hidden">
              {buttons.map(({ text, href, ...button }, i) => (
                <Buttonspo
                  key={text}
                  variant={i === 0 ? "default" : "outline"}
                  asChild
                  {...button}
                >
                  <a href={href}>{text}</a>
                </Buttonspo>
              ))}
            </div>
          )}
          {items && items.length > 0 && (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-x-4 gap-y-8 not-first:mt-8">
              {items.map(({ href, title, image, price }) => (
                <a className="group flex flex-col" key={href} href={href}>
                  <Image
                    className="rounded-md transition-opacity group-hover:opacity-75"
                    {...image}
                  />
                  <Title
                    className="text-sm not-first:mt-4"
                    level={level + 1}
                    size="xl"
                  >
                    {title}
                  </Title>
                  <Money
                    className="text-muted-foreground text-sm not-first:mt-2"
                    amount={price}
                  />
                </a>
              ))}
            </div>
          )}
          {buttons && buttons.length > 0 && (
            <div className="inline-flex flex-wrap gap-2 not-first:mt-8 sm:hidden">
              {buttons.map(({ text, href, ...button }, i) => (
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
      </div>
    </section>
  )
}

export { Collection1 }
