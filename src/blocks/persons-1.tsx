import { cn } from "@/lib/utils"
import { Heading } from "@/components/ui/heading"
import { Paragraph } from "@/components/ui/paragraph"

export interface Persons1Props extends React.ComponentProps<"section"> {
  level?: number
  title: string
  description?: string
  items?: {
    href: string
    title: string
    description: string
    image: {
      src: string
      alt: string
    }
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
          <Heading className="text-center" level={level} size="4xl">
            {title}
          </Heading>
          {description && (
            <Paragraph className="mt-4 text-center">{description}</Paragraph>
          )}
          <div className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
            {items?.map(({ href, image, title, description }) => (
              <a
                className="group flex max-w-md flex-col items-center"
                key={href}
                href={href}
              >
                <img
                  className="aspect-square w-full max-w-60 rounded-full object-cover transition-opacity group-hover:opacity-75"
                  {...image}
                />
                <Heading className="not-first:mt-4" size="xl" level={level + 1}>
                  {title}
                </Heading>
                <Paragraph className="mt-3 text-center" size="sm">
                  {description}
                </Paragraph>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export { Persons1 }
