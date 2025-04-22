import { cn } from "@/lib/utils"
import { Description } from "@/components/description"
import { Title } from "@/components/title"

export interface Events1Props extends React.ComponentProps<"section"> {
  level?: number
  title?: string
  description?: string
  items?: {
    title: string
    description: string
    href: string
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
          <Title size="4xl" level={level}>
            {title}
          </Title>
          {description && (
            <Description className="not-first:mt-4">{description}</Description>
          )}
          <div className="flex flex-col gap-4 not-first:mt-16">
            {items?.map(({ href, title, description }) => (
              <a
                href={href}
                className="flex flex-col items-start gap-4 rounded-lg border p-6"
                key={href}
              >
                <Title level={level + 1}>{title}</Title>
                <Description>{description}</Description>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export { Events1 }
