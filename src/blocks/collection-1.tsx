import { cn } from "@/lib/utils"
import { Image } from "@/components/image"
import { Money } from "@/components/money"
import { Title } from "@/components/title"

export interface Collection1Props extends React.ComponentProps<"section"> {
  level?: number
  title?: string
  items: {
    image: React.ComponentProps<typeof Image>
    href: string
    title: string
    price: number
  }[]
}

function Collection1({
  className,
  level = 2,
  title,
  items,
  ...props
}: Collection1Props) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="mx-auto flex w-full max-w-screen-xl flex-col px-4 lg:px-8">
        {title && (
          <Title level={level} size="2xl">
            {title}
          </Title>
        )}
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 not-first:mt-8 sm:grid-cols-[repeat(auto-fill,minmax(236px,1fr))]">
          {items.map(({ href, title, image, price }) => (
            <a className="group flex flex-col" key={href} href={href}>
              <Image
                className="rounded-md transition-opacity group-hover:opacity-75"
                {...image}
              />
              <Title className="mt-3.5" size="sm" level={level + 1}>
                {title}
              </Title>
              <Money
                className="text-muted-foreground mt-1 text-sm"
                amount={price}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export { Collection1 }
