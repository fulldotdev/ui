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
  align = "center",
  size = "default",
  children,
  links,
  persons,
}: Props) {
  return (
    <section className="py-16">
      <div
        className={cn("container flex flex-col items-center", {
          "items-start text-start": align === "start",
          "items-center text-center": align === "center",
          "items-end text-end": align === "end",
        })}
      >
        <Writeup className="not-first:mt-4" size={size}>
          {children}
        </Writeup>
        <Links className="not-first:mt-8" size={size} links={links} />
        {persons && persons.length > 0 && (
          <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 not-first:mt-12">
            {persons?.map(({ title, description, image, href }, i) => (
              <div
                key={i}
                className={cn("flex max-w-md grow-1 flex-col items-center", {
                  "max-w-sm min-w-3xs basis-3xs": size === "sm",
                  "min-w-4xs basis-4xs max-w-md": size === "default",
                  "min-w-5xs basis-5xs max-w-lg": size === "lg",
                  "items-start text-start": align === "start",
                  "items-center text-center": align === "center",
                  "items-end text-end": align === "end",
                })}
              >
                {image && (
                  <div className="aspect-square w-48 overflow-hidden rounded-full">
                    <Image
                      className="h-full w-full object-cover"
                      sizes="200px"
                      {...image}
                    />
                  </div>
                )}
                <Abstract className="not-first:mt-6" size={size} align={align}>
                  {title && <h3>{title}</h3>}
                  {description && <p>{description}</p>}
                </Abstract>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
