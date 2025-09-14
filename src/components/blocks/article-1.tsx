import type React from "react"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import Image from "@/components/elements/image"
import Person from "@/components/elements/person"
import Prose from "@/components/elements/prose"
import Writeup from "@/components/elements/writeup"

interface Props {
  size?: "sm" | "default" | "lg"
  align?: "start" | "center" | "end"
  title?: string
  description?: string
  published?: Date
  person?: React.ComponentProps<typeof Person>
  image?: React.ComponentProps<typeof Image>
  children?: React.ReactNode
}

export default function ({
  children,
  title,
  description,
  image,
  size,
  align,
  person,
  published,
}: Props) {
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
          <Image className="rounded-lg not-first:mt-16" {...image} />
        </div>
        <Prose size={size}>{children}</Prose>
      </div>
    </section>
  )
}
