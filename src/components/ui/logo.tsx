import * as React from "react"

import { cn } from "@/lib/utils"

function Logo({ className, ...props }: React.ComponentProps<"img">) {
  return (
    <img
      className={cn("logo h-9 w-auto max-w-[200px] object-contain", className)}
      {...props}
    />
  )
}

export { Logo }
