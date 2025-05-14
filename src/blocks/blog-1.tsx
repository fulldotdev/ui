import type { BlockSchema } from "@/schemas/block"
import { cn } from "@/lib/utils"
import { Heading } from "@/components/ui/heading"
import { Paragraph } from "@/components/ui/paragraph"

function Blog1({
  className,
  title,
  description,
  items,
  ...props
}: BlockSchema & React.ComponentProps<"section">) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="mx-auto flex w-full max-w-screen-xl flex-col px-4 lg:px-8">
        <Heading size="4xl" as="h1">
          {title}
        </Heading>
        {description && (
          <Paragraph className="not-first:mt-4">{description}</Paragraph>
        )}
        {items && items.length > 0 && (
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
        )}
      </div>
    </section>
  )
}

export { Blog1 }
