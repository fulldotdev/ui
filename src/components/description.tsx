import React from "react"

import { cn, hasChildren } from "@/lib/utils"

interface Props extends React.ComponentProps<"p"> {
  size?: "sm" | "default" | "lg" | "xl"
}

function Description({
  size = "default",
  children,
  className,
  ...props
}: Props) {
  return hasChildren(children) ? (
    <p
      className={cn(
        "description text-foreground text-prett max-w-lg leading-[1.75]",
        {
          "text-sm leading-[1.75]": size === "sm",
          "text-base leading-[1.75]": size === "default",
          "text-lg leading-[1.75]": size === "lg",
          "text-lg leading-[1.75] md:text-xl": size === "xl",
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
