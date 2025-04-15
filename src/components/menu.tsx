import * as React from "react"
import { v4 as uuidv4 } from "uuid"

import { cn } from "@/lib/utils"
import { Link } from "@/components/link"

interface Props extends React.ComponentProps<"div"> {
  text?: string
  links?: {
    text?: string
    href?: string
  }[]
}

function Menu({ text, links, className, ...props }: Props) {
  return text && links?.length ? (
    <div
      className={cn("menu flex flex-col items-start gap-4", className)}
      {...props}
    >
      <h6 className="text-foreground text-sm font-semibold">{text}</h6>
      <menu className="flex w-full flex-col items-start gap-3">
        {links?.map(({ text, href }) => (
          <Link
            key={uuidv4()}
            className="text-muted-foreground hover:text-foreground font-normal transition-colors"
            href={href}
          >
            {text}
          </Link>
        ))}
      </menu>
    </div>
  ) : null
}

export { Menu }
