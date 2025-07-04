import * as React from "react"

import { cn } from "@/lib/utils"

function Prose({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "prose",
        "text-foreground flex w-full max-w-2xl flex-col",
        "child:not-first:mt-4",
        "heading:scroll-mt-20 heading:not-first:mt-8 heading:text-pretty heading:font-semibold heading:tracking-tight",
        "h1:text-4xl lg:h1:text-5xl",
        "h2:text-3xl",
        "h3:text-2xl",
        "h4:text-xl",
        "h5:text-lg",
        "h6:text-base",
        "p:mt-4 p:leading-[1.8]",
        "img:p:rounded-lg img:rounded-lg",
        "list:ml-4 list:mt-4 list:space-y-2 ul:list-disc ol:list-decimal",
        "[&_a[href]]:text-primary [&_a[href]]:hover:underline",
        className
      )}
      {...props}
    />
  )
}

export { Prose }
