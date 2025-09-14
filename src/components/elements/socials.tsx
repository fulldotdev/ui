import * as React from "react"

import { cn } from "@/lib/utils"
import Social from "@/components/elements/social"

interface Props {
  socials?: string[]
  size?: React.ComponentProps<typeof Social>["size"]
  variant?: React.ComponentProps<typeof Social>["variant"]
  className?: string
}

export default function ({ socials, className, size, variant }: Props) {
  if (!socials || !socials.length) return null
  return (
    <div
      className={cn("flex gap-1 sm:flex-row", className)}
      style={{
        alignItems: "inherit",
      }}
    >
      {socials.map((href, i) => (
        <Social
          key={i}
          variant={variant || "ghost"}
          size={size || "icon"}
          href={href}
        />
      ))}
    </div>
  )
}
