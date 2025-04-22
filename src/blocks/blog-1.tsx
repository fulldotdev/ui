import { cn } from "@/lib/utils"
import { Description } from "@/components/description"
import { Image } from "@/components/image"
import { Title } from "@/components/title"

export interface Posts1Props extends React.ComponentProps<"section"> {
  level?: number
  title: string
  description?: string
  items?: {
    href: string
    title: string
    image: React.ComponentProps<typeof Image>
  }[]
}

function Blog1({
  className,
  level = 2,
  title,
  description,
  items,
  ...props
}: Posts1Props) {
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
          <div className="grid gap-4 gap-y-8 not-first:mt-16 md:grid-cols-2 lg:grid-cols-3">
            {items.map(({ href, title, image }) => (
              <a className="group flex flex-col gap-3" key={href} href={href}>
                <Image
                  className="bg-card rounded-lg object-contain transition-opacity group-hover:opacity-75"
                  {...image}
                />
                <Title level={level + 1} size="xl">
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

export { Blog1 }
