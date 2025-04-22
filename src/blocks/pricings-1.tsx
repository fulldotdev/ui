import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Description } from "@/components/description"
import { List } from "@/components/list"
import { Price } from "@/components/price"
import { Title } from "@/components/title"

export interface Pricings1Props extends React.ComponentProps<"section"> {
  level?: number
  title?: string
  description?: string
  items?: {
    title: string
    description: string
    price: React.ComponentProps<typeof Price>
    list: string[]
    button?: {
      text: string
      href: string
    }
  }[]
}

function Pricings1({
  className,
  level = 2,
  title,
  description,
  items,
  ...props
}: Pricings1Props) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="mx-auto w-full max-w-screen-xl px-4 lg:px-8">
        <div className="flex flex-col">
          <Title size="4xl" level={level}>
            {title}
          </Title>
          {description && (
            <Description className="not-first:mt-4" size="xl">
              {description}
            </Description>
          )}
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 not-first:mt-16 md:grid-cols-2 lg:grid-cols-3">
            {items?.map(({ title, description, price, list, button }) => (
              <a className="flex flex-col gap-4 px-6 text-lg" key={title}>
                <Title level={level + 1} size="xl">
                  {title}
                </Title>
                <Description className="not-first:mt-4" size="xl">
                  {description}
                </Description>
                <Price className="text-2xl font-medium" {...price} />
                <List className="mt-8" items={list} />
                {button && (
                  <Button className="mt-8" asChild>
                    <a href={button.href}>{button.text}</a>
                  </Button>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export { Pricings1 }
