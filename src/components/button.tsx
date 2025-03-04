import * as React from "react"

import { cn } from "@/lib/utils"
import { buttonVariants, Button as UIButton } from "@/components/ui/button"
import { Link } from "@/components/link"

type Props = React.ComponentProps<typeof Link> &
  Omit<React.ComponentProps<typeof UIButton>, "size"> & {
    size?: "xs" | "sm" | "default" | "lg" | "xl" | "2xl" | "icon"
    text?: string
  }

function Button({ size, variant, className, text, children, ...props }: Props) {
  const buttonSize =
    size === "xs" || size === "xl" || size === "2xl" ? undefined : size
  const Comp = "href" in props ? Link : UIButton
  return (
    <Comp
      className={cn(
        buttonVariants({ variant, size: buttonSize }),
        {
          "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5": size === "xs",
          "h-10.5 px-6.5 [&_svg]:size-4.5": size === "xl",
          "h-11 px-7 [&_svg]:size-5": size === "2xl",
        },
        className
      )}
      {...props}
    >
      {text}
      {children}
    </Comp>
  )
}
export { Button }
