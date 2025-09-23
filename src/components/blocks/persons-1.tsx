import { cn } from "@/lib/utils"
import Abstract from "@/components/elements/abstract"
import Image from "@/components/elements/image"
import Link from "@/components/elements/link"
import Links from "@/components/elements/links"
import Writeup from "@/components/elements/writeup"

interface Props {
  size?: "sm" | "default" | "lg"
  align?: "start" | "center" | "end"
  children?: React.ReactNode
  links?: React.ComponentProps<typeof Links>["links"]
  persons?: {
    title?: string
    description?: string
    image?: React.ComponentProps<typeof Image>
    href?: string
    [key: string]: any
  }[]
}

export default function ({
  align = "start",
  size = "default",
  children,
  links,
  persons,
}: Props) {
  return (
    <section className="py-16">
      <div className="container">
        <div
          className={cn("flex flex-col items-center", {
            "items-start text-start": align === "start",
            "items-center text-center": align === "center",
            "items-end text-end": align === "end",
          })}
        >
          <Writeup className="not-first:mt-4" size={size}>
            {children}
          </Writeup>
        </div>
        <Links className="not-first:mt-8" size={size} links={links} />
        {persons && persons.length > 0 && (
          <div
            className={cn(
              "grid w-full grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-x-4 gap-y-8 not-first:mt-16 lg:gap-x-12",
              {
                "justify-between": align === "start",
                "justify-center": align === "center",
                "justify-end": align === "end",
              }
            )}
          >
            {persons?.map(({ title, tagline, image, href }, i) => (
              <div
                key={i}
                className={cn("flex flex-col items-center", {
                  "items-start text-start": align === "start",
                  "items-center text-center": align === "center",
                  "items-end text-end": align === "end",
                })}
              >
                {image && (
                  <Image
                    className="aspect-square h-full w-full max-w-56 overflow-hidden rounded-full object-cover"
                    sizes="200px"
                    {...image}
                  />
                )}
                <Abstract className="not-first:mt-6" size={size} align={align}>
                  {title && <h3>{title}</h3>}
                  {tagline && <p>{tagline}</p>}
                </Abstract>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
