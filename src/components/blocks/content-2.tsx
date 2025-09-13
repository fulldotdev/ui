import type { ContentProps } from "@/schemas/blocks/content"
import { cn } from "@/lib/utils"
import { Links } from "@/components/elements/links"
import { Writeup } from "@/components/elements/writeup"

export default function ({
  align = "center",
  children,
  links,
  image,
  size,
}: ContentProps) {
  return (
    <section className="py-24">
      <div className="container">
        <div
          className={cn(
            "grid w-full auto-cols-fr items-start gap-y-8 lg:grid-flow-col lg:gap-x-16",
            {
              "items-start": align === "start",
              "items-center": align === "center",
              "items-end": align === "end",
            }
          )}
        >
          <div className="flex w-full flex-col items-start">
            <Writeup size={size}>{children}</Writeup>
            <Links size={size} links={links} />
          </div>
          {image?.src && <img className="rounded-lg" {...image} />}
        </div>
      </div>
    </section>
  )
}
