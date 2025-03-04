import * as React from "react"

import { cn, hasChildren } from "@/lib/utils"

interface Props extends React.ComponentProps<"div"> {}

function Prose({ children, className, ...props }: Props) {
  return hasChildren(children) ? (
    <div
      className={cn(
        "prose",
        "flex-flex-col text-foreground mx-auto w-full max-w-2xl",
        "child:mt-9 child:first:mt-0",
        "headings:scroll-mt-20 headings:text-pretty headings:font-semibold headings:tracking-tight",
        "h1:text-4xl h1:font-extrabold lg:h1:text-5xl",
        "h2:text-3xl",
        "h3:text-2xl",
        "h4:text-xl",
        "h5:text-lg",
        "h6:text-base",
        "p:mt-6 p:leading-[1.8]",
        "img:p:rounded-lg img:rounded-lg",
        "list:ml-4 list:space-y-2 ul:list-disc ol:list-decimal",
        className
      )}
      {...props}
    >
      {children}
    </div>
  ) : null
}

export { Prose }
