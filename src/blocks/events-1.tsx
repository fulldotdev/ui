import { cn } from "@/lib/utils"
import { Heading } from "@/components/ui/heading"
import { Paragraph } from "@/components/ui/paragraph"

export interface Events1Props extends React.ComponentProps<"section"> {
  level?: number
  title: string
  description?: string
  items: {
    href: string
    title: string
    description: string
  }[]
}

function Events1({
  className,
  level = 2,
  title,
  description,
  items,
  ...props
}: Events1Props) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="mx-auto w-full max-w-screen-md px-4 md:px-12">
        <div className="flex flex-col">
          <Heading size="4xl" level={level}>
            {title}
          </Heading>
          {description && (
            <Paragraph className=":mt-4">{description}</Paragraph>
          )}
          <div className="mt-16 flex flex-col gap-4">
            {items?.map(({ href, title, description }) => (
              <a
                href={href}
                className="flex flex-col items-start gap-4 rounded-lg border p-6"
                key={href}
              >
                <Heading level={level + 1}>{title}</Heading>
                <Paragraph>{description}</Paragraph>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export { Events1 }
