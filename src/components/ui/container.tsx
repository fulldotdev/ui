import * as React from "react"

import { cn } from "@/lib/utils"

function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-screen-xl px-4 lg:px-8", className)}
      {...props}
    />
  )
}

export { Container }
