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
    tagline?: string
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
          <div className="mt-16 flex flex-wrap justify-center gap-16">
            {items?.map(({ href, image, title, tagline }) => (
              <a
                className="group flex shrink-1 basis-3xs flex-col items-center"
                key={href}
                href={href}
              >
                <img
                  className="aspect-square w-full rounded-full object-cover transition-opacity group-hover:opacity-75"
                  {...image}
                />
                <Heading className="mt-6" size="lg" level={level + 1}>
                  {title}
                </Heading>
                <p className="text-muted-foreground mt-1.5 text-center text-sm">
                  {tagline}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export { Persons1 }
