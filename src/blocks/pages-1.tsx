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
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-16 not-first:mt-16">
            {items?.map(({ href, title, description, image }) => (
              <a
                key={href}
                className="group flex max-w-xl flex-col"
                href={href}
              >
                <img
                  className="rounded-lg transition-opacity group-hover:opacity-75"
                  {...image}
                />
                <Heading className="mt-5" size="lg" level={level}>
                  {title}
                </Heading>
                {description && (
                  <Paragraph className="mt-2">{description}</Paragraph>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export { Pages1 }
