import * as React from "react"

import { cn } from "@/lib/utils"
import { Link } from "@/components/elements/link"

interface LinksProps {
  links?: Array<{
    href?: string
    text?: string
    variant?: "default" | "outline" | "secondary"
    target?: string
  }>
  size?: "sm" | "default" | "lg"
  className?: string
}

export function Links({ links, className }: LinksProps) {
  if (!links || !links.length) return null
  return (
    <div
      className={cn("flex flex-col gap-2 sm:flex-row", className)}
      style={{
        alignItems: "inherit",
      }}
    >
      {links.map((link, i) => (
        <Link key={i} variant={i === 0 ? "default" : "outline"} {...link} />
      ))}
    </div>
  )
}
