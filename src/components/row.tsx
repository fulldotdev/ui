import React from "react"

import { cn, hasChildren } from "@/lib/utils"

interface Props extends React.ComponentProps<"div"> {
  align?: "start" | "center" | "end"
}

function Row({ align = "center", className, children, ...props }: Props) {
  return hasChildren(children) ? (
    <div
      className={cn(
        "row flex w-full flex-row justify-between",
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

export { Row }
