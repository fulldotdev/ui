import * as React from "react"

import { cn, hasChildren } from "@/lib/utils"
import { Container } from "@/components/container"

interface Props extends React.HTMLAttributes<HTMLElement> {}

function Banner({ children, className, ...props }: Props) {
  return hasChildren(children) ? (
    <header
      className={cn(
        "banner bg-primary text-primary-foreground relative z-10 flex h-8 items-center text-center text-sm font-medium",
        className
      )}
      {...props}
    >
      <Container>{children}</Container>
      <style>
        {`
          :root {
            --banner-height: calc(var(--spacing) * 8);
          }
        `}
      </style>
    </header>
  ) : null
}

export { Banner }
