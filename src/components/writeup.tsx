import React from "react"

import { cn, hasChildren } from "@/lib/utils"

interface WriteupProps extends React.ComponentProps<"div"> {
  level?: 1 | 2 | 3
  size?: "xs" | "sm" | "default" | "lg" | "xl" | "2xl"
  align?: "start" | "center" | "end"
  title?: React.ComponentProps<typeof Title>["text"]
  description?: string
}

function Writeup({
  level = 2,
  size = "default",
  align = "start",
  title,
  description,
  children,
  className,
  ...props
}: WriteupProps) {
  const Heading = `h${level}` as "h1" | "h2" | "h3"
  return title || description || hasChildren(children) ? (
    <div
      className={cn(
        "writeup",
        "text-foreground flex w-full max-w-2xl flex-col gap-4",
        "headings:scroll-mt-20 headings:text-pretty headings:font-semibold headings:tracking-tight headings:text-foreground",
        "p:max-w-[85%] p:text-pretty p:leading-[1.75]",
        "lead:leading-[1.75]",
        "list:my-6 list:ml-4 ul:list-disc list:li:mt-2",
        {
          "headings:text-2xl text-sm": size === "xs",
          "headings:text-3xl text-sm": size === "sm",
          "headings:text-4xl text-base": size === "default",
          "headings:text-4xl md:headings:text-5xl text-lg": size === "lg",
          "headings:text-5xl md:headings:text-6xl text-lg md:text-xl":
            size === "xl",
          "headings:text-5xl md:headings:text-7xl text-lg md:text-xl":
            size === "2xl",
        },
        {
          "items-start text-left": align === "start",
          "items-center text-center": align === "center",
          "items-end text-right": align === "end",
        },
        className
      )}
      {...props}
    >
      {title ? <Heading>{title}</Heading> : null}
      {description ? <p>{description}</p> : null}
      {children}
    </div>
  ) : null
}

export { Writeup }
