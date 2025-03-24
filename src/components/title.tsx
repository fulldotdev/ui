import React from "react"

import { cn, hasChildren } from "@/lib/utils"

interface Props
  extends React.ComponentProps<"h1" | "h2" | "h3" | "h4" | "h5" | "h6"> {
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
  align?: "start" | "center" | "end"
  level: 1 | 2 | 3 | 4 | 5 | 6 | number
  text?: string
}

function Title({
  size = "default",
  align = "start",
  level,
  text,
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
  return text || hasChildren(children) ? (
    <Comp
      className={cn(
        "title text-foreground max-w-2xl scroll-mt-20 font-semibold tracking-tight text-pretty",
        {
          "text-xs font-medium": size === "xs",
          "text-sm font-medium": size === "sm",
          "text-base font-medium": size === "default",
          "text-lg font-medium": size === "lg",
          "text-xl font-medium": size === "xl",
          "text-2xl font-semibold": size === "2xl",
          "text-3xl font-semibold": size === "3xl",
          "text-4xl font-semibold": size === "4xl",
          "text-4xl font-semibold md:text-5xl": size === "5xl",
          "text-5xl font-semibold md:text-6xl": size === "6xl",
          "text-5xl font-semibold md:text-7xl": size === "7xl",
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
    </Comp>
  ) : null
}

export { Title }
