import { cn } from "@/lib/utils"
import { Heading } from "@/components/ui/heading"
import { Paragraph } from "@/components/ui/paragraph"

export interface Collections1Props extends React.ComponentProps<"section"> {
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
        <Heading size="2xl" level={level}>
          {title}
        </Heading>
        {description && <Paragraph className="mt-4">{description}</Paragraph>}
        <div className="mt-16 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
          {items.map(({ href, title, image }) => (
            <a className="group flex flex-col" key={href} href={href}>
              <img
                className="rounded-md transition-opacity group-hover:opacity-75"
                {...image}
              />
              <Heading size="lg" className="mt-4" level={level + 1}>
                {title}
              </Heading>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export { Collections1 }
