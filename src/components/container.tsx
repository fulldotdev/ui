import React from "react"

import { cn, hasChildren } from "@/lib/utils"

interface ContainerProps extends React.ComponentProps<"div"> {
  align?: "start" | "center" | "end"
  size?: "sm" | "default" | "lg"
}

function Container({
  size,
  className,
  children,
  ...propsWithAlign
}: ContainerProps) {
  const { align, ...props } = propsWithAlign
  return hasChildren(children) ? (
    <div
      className={cn(
        "mx-auto w-full max-w-screen-xl px-4",
        {
          "flex flex-col": "align" in propsWithAlign,
          "items-start": align === "start",
          "items-center": align === "center",
          "items-end": align === "end",
        },
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
