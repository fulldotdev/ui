import * as React from "react"

import { cn, hasChildren } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface Props extends React.ComponentProps<"a"> {
  variant?: "default" | "outline" | "ghost" | "link"
}

function Link({ className, href, target, children, variant, ...props }: Props) {
  return hasChildren(children) ? (
    <a
      className={cn("link", buttonVariants({ variant }), className)}
      href={href}
      target={href?.startsWith("http") ? "_blank" : target}
      {...props}
    >
      {children}
    </a>
  ) : null
}

export { Link }
