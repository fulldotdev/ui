import * as React from "react"

import { cn } from "@/lib/utils"

function List({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      className={cn("list ml-4 flex list-disc flex-col space-y-4", className)}
      {...props}
    />
  )
}

function ListItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      className={cn(
        "list-item shrink-0 leading-[1.2] has-[>svg]:inline-flex",
        "[&_svg]:mr-1.5 [&_svg]:-ml-4 [&_svg]:inline [&_svg]:size-[1.2em] [&_svg]:shrink-0",
        className
      )}
      {...props}
    />
  )
}

export { List, ListItem }
