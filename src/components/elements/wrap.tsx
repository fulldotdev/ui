import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const wrapVariants = cva("flex flex-row flex-wrap", {
  variants: {
    align: {
      center: "justify-center",
      start: "justify-start",
      end: "justify-end",
    },
  },
  defaultVariants: {
    align: "start",
  },
})

function Wrap({
  className,
  align,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof wrapVariants>) {
  return <div className={cn(wrapVariants({ align }), className)} {...props} />
}

export { Wrap }
