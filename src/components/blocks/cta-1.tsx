import * as React from "react"

import { cn } from "@/lib/utils"
import Background from "@/components/elements/background"
import Links from "@/components/elements/links"
import Writeup from "@/components/elements/writeup"

interface Props {
  size?: "sm" | "default" | "lg"
  align?: "start" | "center" | "end"
  children?: React.ReactNode
  links?: React.ComponentProps<typeof Links>["links"]
  background?: React.ComponentProps<typeof Background>["variant"]
}

export default function ({
  align = "center",
  size,
  background,
  children,
  links,
}: Props) {
  return (
    <section className="-my-16 overflow-hidden py-40">
      <Background
        className="mask-y-from-white mask-y-from-75% mask-y-to-transparent"
        variant={background}
      />
      <div
        className={cn("container flex w-full flex-col", {
          "items-start text-start": align === "start",
          "items-center text-center": align === "center",
          "items-end text-end": align === "end",
        })}
      >
        <Writeup className="text-balance not-first:mt-6" size={size}>
          {children}
        </Writeup>
        <Links className="gap-2 not-first:mt-8" size={size} links={links} />
      </div>
    </section>
  )
}
