import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const columnVariants = cva("flex flex-col w-full", {
  variants: {
    align: {
      center: "items-center",
      start: "items-start",
      end: "items-end",
    },
  },
  defaultVariants: {
    align: "start",
  },
})

function Column({
  className,
  align,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof columnVariants>) {
  return <div className={cn(columnVariants({ align }), className)} {...props} />
}

export { Column }
