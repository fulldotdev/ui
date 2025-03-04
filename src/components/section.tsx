import React from "react"

import { cn, hasChildren } from "@/lib/utils"

interface Props extends React.ComponentProps<"section"> {
  dark?: boolean
}

function Section({ dark, className, children, ...props }: Props) {
  return hasChildren(children) ? (
    <section
      className={cn(
        "section relative w-full py-16",
        {
          dark,
        },
        className
      )}
      {...props}
    >
      {children}
    </section>
  ) : null
}

export { Section }
