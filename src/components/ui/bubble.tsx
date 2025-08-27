import * as React from "react"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Social } from "@/components/ui/social"

function Bubble({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"a"> & VariantProps<typeof buttonVariants>) {
  return (
    <Social
      className={cn("absolute right-4 bottom-4", className)}
      size="icon"
      href={props.href}
      variant="ghost"
      target="_blank"
      {...props}
    />
  )
}

export { Bubble }
