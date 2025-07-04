import * as React from "react"

import { cn } from "@/lib/utils"

function Logo({
  className,
  ...props
}: React.ComponentProps<"div"> & React.ComponentProps<"a">) {
  const Comp = props.href ? "a" : "div"

  return (
    <Comp
      className={cn(
        "flex items-center justify-start gap-3 text-base font-semibold whitespace-nowrap",
        className
      )}
      {...props}
    />
  )
}

function LogoImage({ className, ...props }: React.ComponentProps<"img">) {
  return (
    <img
      className={cn(
        "h-9 w-auto max-w-[200px] shrink-0 object-contain",
        className
      )}
      {...props}
    />
  )
}

export { Logo, LogoImage }
