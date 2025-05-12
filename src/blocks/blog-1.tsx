import { cn } from "@/lib/utils"
import { Heading } from "@/components/ui/heading"
import { Writeup } from "@/components/ui/writeup"

export interface Posts1Props extends React.ComponentProps<"section"> {
  items: {
    href: string
    title: string
    image: {
      src: string
      alt: string
    }
  }[]
}

function Blog1({ className, children, items, ...props }: Posts1Props) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="mx-auto flex w-full max-w-screen-xl flex-col px-4 lg:px-8">
        <Writeup size="4xl">{children}</Writeup>
        <div className="grid gap-4 gap-y-8 not-first:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {items.map(({ href, title, image }) => (
            <a className="group flex flex-col gap-3" key={href} href={href}>
              <img
                className="bg-card rounded-lg object-contain transition-opacity group-hover:opacity-75"
                {...image}
              />
              <Heading as="h3" size="xl">
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
