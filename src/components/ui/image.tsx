import * as React from "react"

import { cn } from "@/lib/utils"

interface Props extends React.ComponentProps<"img"> {}

function Image({ className, ...props }: Props) {
  return <img className={cn("image block", className)} {...props} />
}

export { Image }
