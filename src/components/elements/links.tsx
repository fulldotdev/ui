import * as React from "react"

import { cn } from "@/lib/utils"
import Link from "@/components/elements/link"

interface Props {
  links?: React.ComponentProps<typeof Link>[]
  size?: React.ComponentProps<typeof Link>["size"]
  variant?: React.ComponentProps<typeof Link>["variant"]
  className?: string
  align?: "start" | "center" | "end"
}

export default function ({ links, className, size, variant, align }: Props) {
  if (!links || !links.length) return null
  return (
    <div
      className={cn("flex flex-col gap-2 sm:flex-row", className, {
        "max-sm:items-start sm:justify-start": align === "start",
        "max-sm:items-center sm:justify-center": align === "center",
        "max-sm:items-end sm:justify-end": align === "end",
      })}
      style={{
        alignItems: "inherit",
      }}
    >
      {links.map((link, i) => (
        <Link
          key={i}
          variant={variant || (i === 0 ? "default" : "outline")}
          size={size}
          {...link}
        />
      ))}
    </div>
  )
}
