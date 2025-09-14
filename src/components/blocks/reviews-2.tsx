import { cn } from "@/lib/utils"
import Links from "@/components/elements/links"
import Person from "@/components/elements/person"
import Rating from "@/components/elements/rating"
import Writeup from "@/components/elements/writeup"
import { Marquee } from "@/components/magicui/marquee"

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
  children,
  links,
  reviews,
  size,
  align = "center",
}: Props) {
  const oneFifth = Math.floor((reviews?.length || 0) / 5)
  const columns = [
    reviews,
    reviews
      ? [...reviews.slice(oneFifth), ...reviews.slice(0, oneFifth)]
      : undefined,
    reviews
      ? [...reviews.slice(oneFifth * 2), ...reviews.slice(0, oneFifth * 2)]
      : undefined,
    reviews
      ? [...reviews.slice(oneFifth * 3), ...reviews.slice(0, oneFifth * 3)]
      : undefined,
    reviews
      ? [...reviews.slice(oneFifth * 4), ...reviews.slice(0, oneFifth * 4)]
      : undefined,
  ]
  const duration = (reviews?.length || 0) * 5
  return (
    <section className="py-24">
      <div className="container">
        <div
          className={cn("flex flex-col", {
            "items-start text-start": align === "start",
            "items-center text-center": align === "center",
            "items-end text-end": align === "end",
          })}
        >
          <Writeup className="not-first:mt-4" size={size}>
            {children}
          </Writeup>
          <Links className="not-first:mt-8" size={size} links={links} />
          <div className="relative grid max-h-[700px] w-full grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4 overflow-hidden not-first:mt-16">
            {columns.map((column, i) => (
              <Marquee
                key={i}
                pauseOnHover
                vertical
                className={`px-0`}
                style={{ "--duration": `${duration}s` } as React.CSSProperties}
              >
                {column?.map(
                  ({ title, description, rating, image, tagline }, i) => (
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
                  )
                )}
              </Marquee>
            ))}
            <div className="from-background pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b"></div>
            <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-[100px] bg-gradient-to-t"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
