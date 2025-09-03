import * as React from "react"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function Link({
  className,
  variant,
  size,
  text,
  children,
  ...props
}: React.ComponentProps<"a"> &
  VariantProps<typeof buttonVariants> & { text?: string }) {
  return (
    <a className={cn(buttonVariants({ variant, size, className }))} {...props}>
      {text}
      {children}
    </a>
  )
}

export { Link }
