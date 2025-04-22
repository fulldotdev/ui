import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Description } from "@/components/description"
import { Image } from "@/components/image"
import { Title } from "@/components/title"

export interface Collections1Props extends React.ComponentProps<"section"> {
  level?: number
  title: string
  description?: string
  items?: {
    href: string
    title: string
    image: React.ComponentProps<typeof Image>
  }[]
}

function Collections1({
  className,
  level = 2,
  title,
  description,
  items,
  ...props
}: Collections1Props) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="mx-auto flex w-full max-w-screen-xl flex-col px-4 lg:px-8">
        <Title size="4xl" level={level}>
          {title}
        </Title>
        {description && (
          <Description className="not-first:mt-4">{description}</Description>
        )}
        {items && items.length > 0 && (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 not-first:mt-16">
            {items.map(({ href, title, image }) => (
              <a className="group flex flex-col" key={href} href={href}>
                <Image
                  className="rounded-md transition-opacity group-hover:opacity-75"
                  {...image}
                />
                <Title size="lg" className="not-first:mt-4" level={level + 1}>
                  {title}
                </Title>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export { Collections1 }
