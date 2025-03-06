import * as React from "react"

import { cn, hasChildren } from "@/lib/utils"

interface Props extends React.ComponentProps<"div"> {
  align?: "start" | "center" | "end"
}

function Panel({ className, children, ...propsWithAlign }: Props) {
  const { align, ...props } = propsWithAlign
  return hasChildren(children) ? (
    <div
      className={cn(
        "panel color-card-foreground bg-card relative w-full overflow-hidden rounded-lg border px-4 py-16 md:px-8 xl:px-16",
        {
          "flex flex-col": "align" in propsWithAlign,
          "items-start": align === "start",
          "items-center": align === "center",
          "items-end": align === "end",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  ) : null
}

export { Panel }
