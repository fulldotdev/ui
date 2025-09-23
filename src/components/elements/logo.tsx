import * as React from "react"

import { cn } from "@/lib/utils"
import Image from "@/components/elements/image"

interface Props extends React.ComponentProps<typeof Image> {
  href?: string
}

export default function ({ className, src, title, href, ...props }: Props) {
  if (!src && !title) return null
  const Comp = href ? "a" : "div"
  return (
    <Comp
      className={cn(
        "flex items-center justify-start gap-3 text-base font-semibold whitespace-nowrap",
        className
      )}
      href={href}
    >
      <Image
        className="h-8 w-auto max-w-[200px] shrink-0 object-contain"
        sizes="200px"
        {...props}
      />
      {title}
    </Comp>
  )
}
