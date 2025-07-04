import * as React from "react"

import { cn } from "@/lib/utils"

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
      <h4 className="text-foreground text-sm font-semibold">{text}</h4>
      <menu className="flex w-full flex-col items-start gap-3">
        {links?.map(({ href, text }) => (
          <a
            className="text-muted-foreground hover:text-foreground font-normal transition-colors"
            key={href}
            href={href}
          >
            {text}
          </a>
        ))}
      </menu>
    </div>
  ) : null
}

export { Menu }
