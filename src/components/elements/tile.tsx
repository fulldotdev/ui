import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const tileVariants = cva("text-card-foreground flex flex-col", {
  variants: {
    variant: {
      default: "",
      card: "overflow-hidden rounded-lg border bg-card shadow-sm",
      outline: "border rounded-lg overflow-hidden",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

function Tile({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> &
  React.ComponentProps<"a"> &
  VariantProps<typeof tileVariants>) {
  const Comp = props.href ? "a" : "div"
  return (
    <Comp className={cn(tileVariants({ variant, className }))} {...props} />
  )
}

export { Tile }
