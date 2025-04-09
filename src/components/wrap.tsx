import React from "react"

import { cn, hasChildren } from "@/lib/utils"

interface Props extends React.ComponentProps<"div"> {
  align?: "start" | "center" | "end"
}

function Wrap({ align = "center", className, children, ...props }: Props) {
  return hasChildren(children) ? (
    <div
      className={cn(
        "wrap inline-flex flex-wrap gap-2",
        {
          "justify-start": align === "start",
          "justify-center": align === "center",
          "justify-end": align === "end",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  ) : null
}

export { Wrap }
