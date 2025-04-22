import { cn } from "@/lib/utils"
import { Description } from "@/components/description"
import { Image } from "@/components/image"
import { Title } from "@/components/title"

export interface Pages1Props extends React.ComponentProps<"section"> {
  level?: number
  title?: string
  description?: string
  items?: {
    href: string
    title: string
    description: string
    image: React.ComponentProps<typeof Image>
  }[]
}

function Pages1({
  className,
  level = 2,
  title,
  description,
  items,
  ...props
}: Pages1Props) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="mx-auto w-full max-w-screen-xl px-4 lg:px-8">
        <div className="flex flex-col">
          <Title size="4xl" level={level}>
            {title}
          </Title>
          {description && (
            <Description className="not-first:mt-4">{description}</Description>
          )}
          <div className="grid grid-cols-1 gap-4 gap-y-8 not-first:mt-16 md:grid-cols-2 lg:grid-cols-3">
            {items?.map(({ href, title, description, image }) => (
              <a key={href} className="group flex flex-col" href={href}>
                <Image
                  className="rounded-lg transition-opacity group-hover:opacity-75"
                  {...image}
                />
                <Title className="not-first:mt-3" size="lg" level={level}>
                  {title}
                </Title>
                <Description className="not-first:mt-1">
                  {description}
                </Description>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export { Pages1 }
