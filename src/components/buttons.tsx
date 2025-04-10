import * as React from "react"

import { cn, uuid } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface Props extends React.ComponentProps<"div"> {
  size?: React.ComponentProps<typeof Button>["size"]
  reverse?: boolean
  buttons?: ({ text?: string; href?: string } & React.ComponentProps<
    typeof Button
  >)[]
}

function Buttons({
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

  return buttons && buttons.length > 0 ? (
    <div
      className={cn("buttons inline-flex flex-wrap gap-2", className)}
      {...props}
    >
      {buttons?.map(({ text, href, ...button }, i) =>
        text ? (
          <Button
            key={uuid()}
            variant={getButtonVariant(i)}
            size={size}
            asChild={href ? true : false}
            {...button}
          >
            {href ? <a href={href}>{text}</a> : text}
          </Button>
        ) : null
      )}
    </div>
  ) : null
}

export { Buttons }
