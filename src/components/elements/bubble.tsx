import * as React from "react"

import { cn } from "@/lib/utils"
import Social from "@/components/elements/social"

interface Props extends React.ComponentProps<typeof Social> {
  className?: string
}

export default function ({ className, href, ...props }: Props) {
  return (
    <Social
      className={cn("absolute right-4 bottom-4", className)}
      size="icon"
      href={href}
      variant="ghost"
      target="_blank"
      {...props}
    />
  )
}
