import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const taglineVariants = cva(
  "tagline text-primary font-medium max-w-xl leading-[1.75] text-pretty",
  {
    variants: {
      size: {
        xs: "text-xs leading-[1.75]",
        sm: "text-sm leading-[1.75]",
        default: "text-base leading-[1.75]",
        lg: "text-lg leading-[1.75]",
        xl: "text-lg leading-[1.75] md:text-xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function Tagline({
  className,
  size,
  ...props
}: React.ComponentProps<"p"> & VariantProps<typeof taglineVariants>) {
  return <p className={cn(taglineVariants({ size }), className)} {...props} />
}

export { Tagline }
