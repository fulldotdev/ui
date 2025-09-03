import * as React from "react"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function Link({
  className,
  variant,
  size,
  text,
  ...props
}: React.ComponentProps<"a"> &
  VariantProps<typeof buttonVariants> & { text?: string }) {
  return (
    <a className={cn(buttonVariants({ variant, size, className }))} {...props}>
      {text}
    </a>
  )
}

export { Link }
