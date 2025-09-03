import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const gridVariants = cva("grid gap-4 w-full ", {
  variants: {
    size: {
      sm: "grid-cols-[repeat(auto-fit,minmax(200px,1fr))]",
      default: "grid-cols-[repeat(auto-fit,minmax(260px,1fr))]",
      lg: "grid-cols-[repeat(auto-fit,minmax(320px,1fr))]",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

function Grid({
  className,
  size,
  children,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof gridVariants>) {
  return (
    <div className={cn(gridVariants({ size, className }))} {...props}>
      {children}
    </div>
  )
}

export { Grid }
