import * as React from "react"

import { cn } from "@/lib/utils"
import { Image } from "@/components/image"
import { Link } from "@/components/link"

interface Props extends React.ComponentProps<typeof Link> {
  src?: React.ComponentProps<typeof Image>["src"]
  alt?: React.ComponentProps<typeof Image>["alt"]
  text?: string
}

function Logo({ href = "/", src, alt, text, className, ...props }: Props) {
  return src || text ? (
    <a
      className={cn(
        "logo text-foreground flex items-center gap-3 text-base leading-none font-semibold whitespace-nowrap",
        className
      )}
      href={href}
      {...props}
    >
      <Image
        className="h-9 w-auto max-w-[200px] object-contain"
        src={src}
        alt={alt}
      />
      <span className="text-lg font-semibold">{text}</span>
    </a>
  ) : null
}

export { Logo }
