import * as React from "react"
import { cn } from "cn"

function Form({ className, ...props }: React.ComponentProps<"form">) {
  return (
    <form
      data-slot="form"
      className={cn("flex flex-col gap-6", className)}
      {...props}
    />
  )
}

export { Form }
