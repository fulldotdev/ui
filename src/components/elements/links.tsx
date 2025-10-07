import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import Link from "@/components/elements/link"

const variants = cva("flex flex-col gap-2 sm:flex-row", {
  variants: {
    align: {
      start: "max-sm:items-start sm:justify-start",
      center: "max-sm:items-center sm:justify-center",
      end: "max-sm:items-end sm:justify-end",
    },
  },
})

interface Props extends VariantProps<typeof variants> {
  className?: string
  links?: React.ComponentProps<typeof Link>[]
  size?: React.ComponentProps<typeof Link>["size"]
  variant?: React.ComponentProps<typeof Link>["variant"]
}

export default function ({ links, className, size, variant, align }: Props) {
  if (!links || !links.length) return null
  return (
    <div className={cn(variants({ align }), className)}>
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
