import { cn } from "@/lib/utils"
import { Heading } from "@/components/ui/heading"
import { Paragraph } from "@/components/ui/paragraph"

export interface Posts1Props extends React.ComponentProps<"section"> {
  level?: number
  title: string
  description?: string
  items: {
    href: string
    title: string
    image: {
      src: string
      alt: string
    }
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
        <Heading size="4xl" level={level}>
          {title}
        </Heading>
        {description && (
          <Paragraph className="not-first:mt-4">{description}</Paragraph>
        )}
        <div className="grid gap-4 gap-y-8 not-first:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {items.map(({ href, title, image }) => (
            <a className="group flex flex-col gap-3" key={href} href={href}>
              <img
                className="bg-card rounded-lg object-contain transition-opacity group-hover:opacity-75"
                {...image}
              />
              <Heading level={level + 1} size="xl">
                {title}
              </Heading>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export { Blog1 }
