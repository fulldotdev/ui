import * as React from "react"

import { cn } from "@/lib/utils"
import Link from "@/components/elements/link"

interface Props {
  links?: React.ComponentProps<typeof Link>[]
  size?: React.ComponentProps<typeof Link>["size"]
  variant?: React.ComponentProps<typeof Link>["variant"]
  className?: string
}

export default function ({ links, className, size, variant }: Props) {
  if (!links || !links.length) return null
  return (
    <div
      className={cn("flex gap-2 max-sm:flex-col", className)}
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
