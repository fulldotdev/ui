import { cn } from "@/lib/utils"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Heading } from "@/components/ui/heading"
import { Paragraph } from "@/components/ui/paragraph"
import { Rating } from "@/components/rating"

export interface Reviews1Props extends React.ComponentProps<"section"> {
  level?: number
  title: string
  description?: string
  items: {
    title: string
    tagline?: string
    description?: string
    avatar?: string
    rating?: number
  }[]
}

function Reviews1({
  className,
  level = 2,
  title,
  description,
  items,
  ...props
}: Reviews1Props) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="mx-auto flex w-full max-w-screen-xl flex-col px-4 lg:px-8">
        <Heading size="4xl" level={level}>
          {title}
        </Heading>
        {description && <Paragraph className="mt-4">{description}</Paragraph>}
        <div className="mt-12 columns-3xs gap-4">
          {items.map(({ title, description, rating = 5, tagline, avatar }) => (
            <div
              key={title}
              className="flex break-inside-avoid flex-col rounded-lg border p-6"
            >
              {rating && <Rating score={rating} />}
              <div className="mt-3.5 flex w-full gap-4">
                {avatar && (
                  <img
                    src={avatar}
                    className="size-12 shrink-0 grow-0 rounded-full object-cover"
                    alt={title}
                  />
                )}
                <div className="flex w-full flex-col">
                  <Heading level={level + 1}>{title}</Heading>
                  {tagline && (
                    <span className="text-muted-foreground z-20 mt-0.5 text-sm">
                      {tagline}
                    </span>
                  )}
                </div>
              </div>
              {description && (
                <Paragraph className="mt-3">{description}</Paragraph>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { Reviews1 }
