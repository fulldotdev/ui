import * as React from "react"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { badgeVariants } from "@/components/ui/badge"

function Chip({
  className,
  variant,
  ...props
}: React.ComponentProps<"a"> & VariantProps<typeof badgeVariants>) {
  const Comp = "href" in props ? "a" : "span"
  return (
    <Comp
      className={cn(badgeVariants({ variant }), "px-3 py-1", className)}
      {...props}
    />
  )
}

export { Chip }
