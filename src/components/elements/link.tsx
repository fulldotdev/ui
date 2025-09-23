import * as React from "react"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { rainbowButtonVariants } from "@/components/magicui/rainbow-button"

interface Props extends Omit<VariantProps<typeof buttonVariants>, "variant"> {
  children?: React.ReactNode
  className?: string
  text?: string
  href?: string
  target?: string
  variant?:
    | VariantProps<typeof buttonVariants>["variant"]
    | "rainbow"
    | "rainbow-outline"
}

export default function ({
  className,
  variant,
  size,
  text,
  children,
  href,
  ...props
}: Props) {
  if (!href) return null
  let c: string = ""
  if (variant === "rainbow")
    c = rainbowButtonVariants({ variant: "default", size, className })
  else if (variant === "rainbow-outline")
    c = rainbowButtonVariants({ variant: "outline", size, className })
  else c = buttonVariants({ variant, size, className })

  return (
    <a className={cn(c)} {...props} href={href}>
      {text}
      {children}
    </a>
  )
}
