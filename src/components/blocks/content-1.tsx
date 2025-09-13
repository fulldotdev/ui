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
    <section className="overflow-hidden py-24">
      <div
        className={cn("container", {
          "items-start text-start": align === "start",
          "items-center text-center": align === "center",
          "items-end text-end": align === "end",
        })}
      >
        <Writeup className="text-balance not-first:mt-6" size={size}>
          {children}
        </Writeup>
        <Links className="not-first:mt-8" size={size} links={links} />
        {image?.src && (
          <img className="rounded-lg not-first:mt-16" {...image} />
        )}
      </div>
    </section>
  )
}
