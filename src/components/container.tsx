import React from "react"

import { cn, hasChildren } from "@/lib/utils"

interface ContainerProps extends React.ComponentProps<"div"> {
  size?: "sm" | "default" | "lg"
}

function Container({
  size = "default",
  className,
  children,
  ...props
}: ContainerProps) {
  return hasChildren(children) ? (
    <div
      className={cn(
        "mx-auto w-full px-4",
        {
          "max-w-screen-md md:px-12": size === "sm",
          "max-w-screen-xl lg:px-8": size === "default",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  ) : null
}

export { Container }
