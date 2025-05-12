import React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const writeupVariants = cva(
  "writeup text-pretty max-w-2xl text-left heading:scroll-mt-20 heading:font-semibold heading:tracking-tight text-foreground !leading-[1.75] child:not-first:mt-4",
  {
    variants: {
      size: {
        xs: "text-xs heading:text-xs",
        sm: "text-sm heading:text-sm",
        default: "text-base heading:text-base",
        lg: "text-lg heading:text-lg",
        xl: "text-lg md:text-xl heading:text-xl",
        "2xl": "text-lg md:text-xl heading:text-2xl",
        "3xl": "text-lg md:text-xl heading:text-3xl",
        "4xl": "text-lg md:text-xl heading:text-4xl",
        "5xl": "text-lg md:text-xl heading:text-4xl lg:heading:text-5xl",
        "6xl": "text-lg md:text-xl heading:text-5xl lg:heading:text-6xl",
        "7xl": "text-lg md:text-xl heading:text-5xl lg:heading:text-7xl",
        "8xl": "text-lg md:text-xl heading:text-5xl lg:heading:text-8xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function Writeup({
  className,
  size,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof writeupVariants>) {
  return <div className={cn(writeupVariants({ size }), className)} {...props} />
}

export { Writeup }
