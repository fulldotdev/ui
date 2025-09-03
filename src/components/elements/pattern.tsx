import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const patternVariants = cva(
  "absolute inset-0 w-full h-full pointer-events-none ",
  {
    variants: {
      pattern: {
        gradient: [
          "opacity-50 bg-[radial-gradient(ellipse_closest-side_at_center,color-mix(in_srgb,var(--primary)_50%,transparent)_0%,transparent_100%)]",
          // "absolute before:absolute before:-inset-1 before:block before:bg-[radial-gradient(ellipse_closest-side_at_center,color-mix(in_srgb,var(--primary)_100%,transparent)_0%,transparent_100%)]",
        ],
        ai: [
          "opacity-40 bg-[radial-gradient(ellipse_closest-side_at_center,hsla(292,91.4%,72.5%,0.3)_25%,hsla(47.9,95.8%,53.1%,0.3)_50%,hsla(158.1,64.4%,51.6%,0.25)_75%,transparent_100%)]",
        ],
      },
    },
    defaultVariants: {
      pattern: "gradient",
    },
  }
)

function Pattern({
  className,
  pattern,
  color,
  ...props
}: VariantProps<typeof patternVariants> &
  React.ComponentProps<"div"> & {
    color?: string
    colorOpacity?: string
  }) {
  return (
    <div className={cn(patternVariants({ pattern }), className)} {...props} />
  )
}

export { Pattern }
