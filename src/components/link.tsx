import * as React from "react"

import { cn, hasChildren } from "@/lib/utils"

interface Props extends React.ComponentProps<"a"> {
  text?: string
}

function Link({ className, href, target, children, text, ...props }: Props) {
  const linkTarget = href?.startsWith("http") ? "_blank" : target

  return text || hasChildren(children) ? (
    <a
      className={cn("link", className)}
      href={href}
      target={linkTarget}
      {...props}
    >
      {text}
      {children}
    </a>
  ) : null
}

export { Link }
