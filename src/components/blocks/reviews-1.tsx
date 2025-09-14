import { cn } from "@/lib/utils"
import Links from "@/components/elements/links"
import Person from "@/components/elements/person"
import Rating from "@/components/elements/rating"
import Writeup from "@/components/elements/writeup"

interface Props {
  align?: "start" | "center" | "end"
  size?: "sm" | "default" | "lg"
  children?: React.ReactNode
  links?: React.ComponentProps<typeof Links>["links"]
  reviews?: {
    title?: string
    description?: string
    rating?: number
    image?: React.ComponentProps<typeof Person>["image"]
    tagline?: string
  }[]
}

export default function ({
  align = "center",
  size,
  children,
  links,
  reviews,
}: Props) {
  return (
    <section className="relative w-full py-24">
      <div
        className={cn("container flex w-full flex-col", {
          "items-start text-start": align === "start",
          "items-center text-center": align === "center",
          "items-end text-end": align === "end",
        })}
      >
        <Writeup className="not-first:mt-4" size={size}>
          {children}
        </Writeup>
        <Links
          className="not-first:mt-8 not-last:mb-4"
          size={size}
          links={links}
        />
        <div className="w-full columns-2xs gap-4 space-y-4 not-first:mt-12">
          {reviews?.map(({ title, description, rating, image, tagline }, i) => (
            <div
              className="flex break-inside-avoid flex-col items-start overflow-hidden rounded-lg border p-6 text-start"
              key={i}
            >
              <Person image={image} title={title} tagline={tagline} />
              <Rating className="not-first:mt-5" rating={rating} />
              {description && (
                <p className="text-muted-foreground text-base leading-7 not-first:mt-4">
                  {description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
