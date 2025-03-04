import * as React from "react"

import { cn, hasChildren } from "@/lib/utils"

interface Props extends React.ComponentProps<"div"> {}

function Panel({ className, children, ...props }: Props) {
  return hasChildren(children) ? (
    <div
      className={cn(
        "panel color-card-foreground bg-card relative w-full overflow-hidden rounded-lg border px-4 py-16 md:px-8 xl:px-16",
        className
      )}
      {...props}
    >
      {children}
    </div>
  ) : null
}

export { Panel }
