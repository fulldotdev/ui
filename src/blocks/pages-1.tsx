import { cn } from "@/lib/utils"
import { Heading } from "@/components/ui/heading"
import { Paragraph } from "@/components/ui/paragraph"

export interface Pages1Props extends React.ComponentProps<"section"> {
  level?: number
  title: string
  description?: string
  items: {
    href: string
    title: string
    description: string
    image: {
      src: string
      alt: string
    }
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
          <Heading size="4xl" level={level}>
            {title}
          </Heading>
          {description && <Paragraph className="mt-4">{description}</Paragraph>}
          <div className="mt-16 grid grid-cols-1 gap-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {items?.map(({ href, title, description, image }) => (
              <a key={href} className="group flex flex-col" href={href}>
                <img
                  className="rounded-lg transition-opacity group-hover:opacity-75"
                  {...image}
                />
                <Heading className="mt-3" size="lg" level={level}>
                  {title}
                </Heading>
                <Paragraph className="mt-1">{description}</Paragraph>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export { Pages1 }
