import * as React from "react"

import { cn, hasChildren } from "@/lib/utils"

interface Props extends React.ComponentProps<"div"> {
  size?: "sm" | "default" | "lg" | "xl"
  align?: "start" | "center" | "end"
  length?: number
}

function Grid({
  size = "default",
  align,
  className,
  children,
  length = React.Children.count(children),
  ...props
}: Props) {
  return hasChildren(children) ? (
    <div
      className={cn(
        "relative grid items-start",
        {
          "md:grid-cols-2": size === "default" && length >= 2,
          "sm:grid-cols-2 md:grid-cols-3": size === "default" && length === 3,
          "sm:grid-cols-2 lg:grid-cols-4": size === "default" && length === 4,
          "sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5":
            size === "default" && length === 5,
          "sm:grid-cols-2 lg:grid-cols-3": size === "default" && length === 6,
          "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4":
            size === "default" && length >= 6,
        },
        {
          "lg:grid-cols-2": size === "lg" && length >= 2,
          "md:grid-cols-3": size === "lg" && length === 3,
          "md:grid-cols-2 xl:grid-cols-4": size === "lg" && length === 4,
          "md:grid-cols-2 lg:grid-cols-3": size === "lg" && length >= 5,
        },
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

export { Grid }
