import { CalendarIcon } from "lucide-react"

import type { ArticleProps } from "@/schemas/blocks/article"
import { cn } from "@/lib/utils"
import { Person } from "@/components/elements/person"
import { Prose } from "@/components/elements/prose"
import { Writeup } from "@/components/elements/writeup"

export default function ({
  children,
  title,
  description,
  image,
  size,
  align,
  person,
  published,
}: ArticleProps) {
  return (
    <section className="py-16" id="article">
      <div className="container flex flex-col items-center gap-16">
        <div
          className={cn("flex max-w-5xl flex-col", {
            "items-start text-start": align === "start",
            "items-center text-center": align === "center",
            "items-end text-end": align === "end",
          })}
        >
          {published && (
            <p className="inline-flex items-center gap-2 text-sm font-medium">
              <CalendarIcon className="size-4" />
              {new Date(published).toLocaleDateString("nl-NL")}
            </p>
          )}
          <Writeup size={size}>
            {title && <h1>{title}</h1>}
            {description && <p>{description}</p>}
          </Writeup>
          <Person className="not-first:mt-8" {...person} />
          {image?.src && (
            <img className="rounded-lg not-first:mt-16" {...image} />
          )}
        </div>
        <Prose size={size}>{children}</Prose>
      </div>
    </section>
  )
}
