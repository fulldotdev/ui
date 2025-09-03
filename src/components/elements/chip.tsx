import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { badgeVariants } from "@/components/ui/badge"

function Chip({
  className,
  variant = "secondary",
  href,
  text,
  children,
  ...props
}: React.ComponentProps<"a"> &
  VariantProps<typeof badgeVariants> & { text?: string }) {
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

export { Chip }
