import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

export const splitVariants = cva(
  "grid w-full gap-y-8 auto-cols-fr lg:grid-flow-col lg:gap-x-16 items-start",
  {
    variants: {
      reverse: {
        true: "lg:[&>*:first-child]:order-last lg:[&>*:last-child]:order-first",
        false: null,
      },
      align: {
        default: "",
        start: "lg:*:sticky lg:*:top-16 items-start",
        center: "items-center",
        end: "items-end",
      },
    },
    defaultVariants: {
      reverse: false,
      align: "default",
    },
  }
)

function Split({
  className,
  reverse,
  align,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof splitVariants>) {
  return (
    <div
      className={cn(splitVariants({ reverse, align }), className)}
      {...props}
    />
  )
}

export { Split }
