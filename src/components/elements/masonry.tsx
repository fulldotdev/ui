import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const masonryVariants = cva("gap-4 space-y-4 w-full *:break-inside-avoid", {
  variants: {
    size: {
      sm: "columns-3xs",
      default: "columns-2xs",
      lg: "columns-sm",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

function Masonry({
  className,
  size,
  children,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof masonryVariants>) {
  return (
    <div className={cn(masonryVariants({ size, className }))} {...props}>
      {children}
    </div>
  )
}

export { Masonry }
