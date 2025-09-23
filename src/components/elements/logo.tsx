import * as React from "react"

import { cn } from "@/lib/utils"
import Image from "@/components/elements/image"

interface Props {
  className?: string
  image?: React.ComponentProps<typeof Image>
  children?: React.ReactNode
  href?: string
  title?: string
}

export default function ({
  className,
  image,
  title,
  children,
  href,
  ...props
}: Props) {
  if (!image?.src && !title) return null
  const Comp = href ? "a" : "div"
  return (
    <Comp
      className={cn(
        "flex items-center justify-start gap-3 text-base font-semibold whitespace-nowrap",
        className
      )}
      href={href}
      {...props}
    >
      <Image
        className="h-8 w-auto max-w-[200px] shrink-0 object-contain"
        sizes="200px"
        {...image}
      />
      {title}
    </Comp>
  )
}
