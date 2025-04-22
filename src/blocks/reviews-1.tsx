import { cn } from "@/lib/utils"
import { Description } from "@/components/description"
import { Rating } from "@/components/rating"
import { Title } from "@/components/title"

export interface Reviews1Props extends React.ComponentProps<"section"> {
  level?: number
  title: string
  description?: string
  items: {
    rating: number
    title: string
    description: string
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
        <Title size="4xl" level={level}>
          {title}
        </Title>
        {description && (
          <Description className="mt-4">{description}</Description>
        )}
        <div className="mt-12 columns-3xs gap-4">
          {items.map(({ title, description, rating = 5 }) => (
            <div
              key={title}
              className="flex break-inside-avoid flex-col rounded-lg border p-6"
            >
              <Rating score={rating} />
              <Title className="mt-4" level={level + 1}>
                {title}
              </Title>
              <Description className="mt-3">{description}</Description>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { Reviews1 }
