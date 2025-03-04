import * as React from "react"
import { v4 as uuidv4 } from "uuid"

import { cn } from "@/lib/utils"
import { Button } from "@/components/button"

interface Props extends React.ComponentProps<"div"> {
  size?: React.ComponentProps<typeof Button>["size"]
  align?: "default" | "start" | "center" | "end"
  reverse?: boolean
  buttons?: ({ text?: string; href?: string } & React.ComponentProps<
    typeof Button
  >)[]
}

function Buttons({
  align = "default",
  reverse = false,
  size,
  buttons,
  className,
  ...props
}: Props) {
  const getButtonVariant = (index: number) => {
    if (reverse) {
      const length = buttons?.length || 0
      if (index === length - 1) return "default"
      if (index === length - 2) return "outline"
      return "ghost"
    }
    if (index === 0) return "default"
    if (index === 1) return "outline"
    return "ghost"
  }

  return buttons ? (
    <div
      className={cn(
        "buttons inline-flex flex-wrap gap-2",
        {
          "justify-start": align === "start",
          "justify-center": align === "center",
          "justify-end": align === "end",
        },
        className
      )}
      {...props}
    >
      {buttons?.map(({ text, href, ...button }, i) =>
        text && href ? (
          <Button
            key={uuidv4()}
            variant={getButtonVariant(i)}
            size={size}
            asChild
            href={href}
            {...button}
          >
            {text}
          </Button>
        ) : null
      )}
    </div>
  ) : null
}

export { Buttons }
