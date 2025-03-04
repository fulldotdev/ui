import React from "react"

import { cn, hasChildren } from "@/lib/utils"

interface Props extends React.HTMLAttributes<HTMLElement> {
  align?: "start" | "center" | "end" | "default"
}

function Column({ align = "default", className, children, ...props }: Props) {
  return hasChildren(children) ? (
    <div
      className={cn(
        "column flex flex-col",
        {
          "items-start": align === "start",
          "items-center": align === "center",
          "items-end": align === "end",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  ) : null
}

export { Column }
