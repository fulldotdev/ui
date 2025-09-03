import * as React from "react"

import { cn } from "@/lib/utils"

function Section({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section className={cn("relative w-full py-24", className)} {...props} />
  )
}

export { Section }
