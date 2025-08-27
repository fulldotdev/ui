import * as React from "react"

import { cn } from "@/lib/utils"

function Header({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <header
      className={cn(
        "bg-background sticky top-0 z-50 flex h-14 w-full items-center",
        className
      )}
      {...props}
    />
  )
}

function HeaderContainer({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-screen-xl items-center justify-between gap-4 px-4 max-sm:gap-0 lg:px-8",
        className
      )}
      {...props}
    />
  )
}

export { Header, HeaderContainer }
