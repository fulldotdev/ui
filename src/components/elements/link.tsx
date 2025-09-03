import * as React from "react"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

import { rainbowButtonVariants } from "../magicui/rainbow-button"

function Link({
  className,
  variant,
  size,
  text,
  children,
  ...props
}: React.ComponentProps<"a"> & {
  text?: string
  size?: "default" | "sm" | "lg" | "icon"
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "rainbow"
    | "rainbow-outline"
}) {
  let c: string = ""
  if (variant === "rainbow")
    c = rainbowButtonVariants({ variant: "default", size, className })
  else if (variant === "rainbow-outline")
    c = rainbowButtonVariants({ variant: "outline", size, className })
  else c = buttonVariants({ variant, size, className })

  return (
    <a className={cn(c)} {...props}>
      {text}
      {children}
    </a>
  )
}

export { Link }
