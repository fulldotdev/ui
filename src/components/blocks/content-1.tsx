import * as React from "react"

import { cn } from "@/lib/utils"
import Image from "@/components/elements/image"
import Links from "@/components/elements/links"
import Writeup from "@/components/elements/writeup"

interface Props {
  size?: "sm" | "default" | "lg"
  align?: "start" | "center" | "end"
  children?: React.ReactNode
  links?: React.ComponentProps<typeof Links>["links"]
  image?: React.ComponentProps<typeof Image>
}

export default function ({
  align = "center",
  children,
  links,
  image,
  size,
}: Props) {
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
        <Image className="rounded-lg not-first:mt-16" {...image} />
      </div>
    </section>
  )
}
