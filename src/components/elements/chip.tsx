import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { badgeVariants } from "@/components/ui/badge"

interface Props extends VariantProps<typeof badgeVariants> {
  text?: string
  href?: string
  className?: string
  children?: React.ReactNode
}

export default function ({
  className,
  variant = "secondary",
  href,
  text,
  children,
  ...props
}: Props) {
  const Comp = href ? "a" : "span"
  return (
    <Comp
      className={cn(badgeVariants({ variant }), "px-3 py-1", className)}
      href={href}
      {...props}
    >
      {text}
      {children}
      {href && <ArrowUpRight />}
    </Comp>
  )
}
