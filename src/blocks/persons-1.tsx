import { cn } from "@/lib/utils"
import { Description } from "@/components/description"
import { Image } from "@/components/image"
import { Title } from "@/components/title"

export interface Persons1Props extends React.ComponentProps<"section"> {
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

function Persons1({
  className,
  level = 2,
  title,
  description,
  items,
  ...props
}: Persons1Props) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="mx-auto w-full max-w-screen-xl px-4 lg:px-8">
        <div className="flex flex-col items-center">
          <Title className="text-center" level={level} size="4xl">
            {title}
          </Title>
          {description && (
            <Description className="text-center not-first:mt-4">
              {description}
            </Description>
          )}
          <div className="grid grid-cols-1 gap-16 not-first:mt-16 md:grid-cols-2 lg:grid-cols-3">
            {items?.map(({ href, image, title, description }) => (
              <a
                className="group flex max-w-md flex-col items-center"
                key={href}
                href={href}
              >
                <Image
                  className="aspect-square w-full max-w-60 rounded-full object-cover transition-opacity group-hover:opacity-75"
                  {...image}
                />
                <Title className="not-first:mt-4" size="xl" level={level + 1}>
                  {title}
                </Title>
                <Description className="not-first:mt-1" size="sm">
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

export { Persons1 }
