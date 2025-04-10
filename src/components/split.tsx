import * as React from "react"

import { cn, hasChildren } from "@/lib/utils"

interface Props extends React.ComponentProps<"div"> {}

function Split({ className, children, ...props }: Props) {
  return hasChildren(children) ? (
    <div
      className={cn(
        "split relative grid gap-y-8 md:grid-cols-2 md:gap-x-8 lg:gap-x-16",
        className
      )}
      {...props}
    >
      {children}
    </div>
  ) : null
}

export { Split }
