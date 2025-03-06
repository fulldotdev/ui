import React from "react"

import { cn, hasChildren } from "@/lib/utils"

interface Props extends React.ComponentProps<"p"> {
  size?: "xs" | "sm" | "default" | "lg" | "xl" | "2xl"
  align?: "start" | "center" | "end"
  text?: string
}

function Description({
  size = "default",
  align = "start",
  text,
  children,
  className,
  ...props
}: Props) {
  return text || hasChildren(children) ? (
    <p
      className={cn(
        "description text-foreground text-prett max-w-lg leading-[1.75]",
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
      {text}
      {children}
    </p>
  ) : null
}

export { Description }
