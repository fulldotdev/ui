import { cn, money } from "@/lib/utils"
import { Heading } from "@/components/ui/heading"

export interface Collection1Props extends React.ComponentProps<"section"> {
  level?: number
  title: string
  items: {
    href: string
    title: string
    price: number
    image: {
      src: string
      alt: string
    }
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
        <Heading level={level} size="2xl">
          {title}
        </Heading>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-[repeat(auto-fill,minmax(236px,1fr))]">
          {items.map(({ href, title, image, price }) => (
            <a className="group flex flex-col" key={href} href={href}>
              <img
                className="rounded-md transition-opacity group-hover:opacity-75"
                {...image}
              />
              <Heading className="mt-3.5" size="sm" level={level + 1}>
                {title}
              </Heading>
              <div className="text-muted-foreground mt-1 text-sm">
                {money(price)}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export { Collection1 }
