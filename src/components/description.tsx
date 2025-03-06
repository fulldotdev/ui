import React from "react"

import { cn, hasChildren } from "@/lib/utils"

interface Props extends React.ComponentProps<"p"> {
  size?: "xs" | "sm" | "default" | "lg" | "xl" | "2xl"
  align?: "start" | "center" | "end"
}

function Description({
  size = "default",
  align = "start",
  children,
  className,
  ...props
}: Props) {
  return hasChildren(children) ? (
    <p
      className={cn(
        "description text-foreground text-prett max-w-[85%] leading-[1.75]",
        {
          "text-sm": size === "xs" || size === "sm",
          "text-base": size === "default",
          "text-lg": size === "lg",
          "text-lg md:text-xl": size === "xl" || size === "2xl",
        },
        {
          "text-left": align === "start",
          "text-center": align === "center",
          "text-right": align === "end",
        },
        className
      )}
      {...props}
    >
      {children}
    </p>
  ) : null
}

export { Description }
