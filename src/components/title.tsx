import React from "react"

import { cn, hasChildren } from "@/lib/utils"

interface Props
  extends React.ComponentProps<"h1" | "h2" | "h3" | "h4" | "h5" | "h6"> {
  level: 1 | 2 | 3 | 4 | 5 | 6 | number
  size?:
    | "xs"
    | "sm"
    | "default"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "8xl"
}

function Title({
  size = "default",
  level,
  children,
  className,
  ...props
}: Props) {
  const Comp = `h${level > 6 || level < 1 ? 2 : level}` as
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
  return hasChildren(children) ? (
    <Comp
      className={cn(
        "title text-foreground max-w-2xl scroll-mt-20 font-semibold tracking-tight text-pretty",
        {
          "text-xs": size === "xs",
          "text-sm": size === "sm",
          "text-base": size === "default",
          "text-lg": size === "lg",
          "text-xl": size === "xl",
          "text-2xl": size === "2xl",
          "text-3xl": size === "3xl",
          "text-4xl": size === "4xl",
          "text-4xl lg:text-5xl": size === "5xl",
          "text-5xl lg:text-6xl": size === "6xl",
          "text-5xl lg:text-7xl": size === "7xl",
          "text-5xl lg:text-8xl": size === "8xl",
        },
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  ) : null
}

export { Title }
