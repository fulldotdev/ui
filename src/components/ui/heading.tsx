import React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const headingVariants = cva(
  "heading max-w-2xl scroll-mt-20 font-semibold tracking-tight text-pretty text-foreground",
  {
    variants: {
      size: {
        xs: "text-xs",
        sm: "text-sm",
        default: "text-base",
        lg: "text-lg",
        xl: "text-xl",
        "2xl": "text-2xl",
        "3xl": "text-3xl",
        "4xl": "text-4xl",
        "5xl": "text-4xl lg:text-5xl",
        "6xl": "text-5xl lg:text-6xl",
        "7xl": "text-5xl lg:text-7xl",
        "8xl": "text-5xl lg:text-8xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function Heading({
  className,
  size,
  as,
  ...props
}: React.ComponentProps<"h1" | "h2" | "h3" | "h4" | "h5" | "h6"> &
  VariantProps<typeof headingVariants> & {
    as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  }) {
  const Comp = as
  return (
    <Comp className={cn(headingVariants({ size }), className)} {...props} />
  )
}

export { Heading }
