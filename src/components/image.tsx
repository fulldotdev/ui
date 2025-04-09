import * as React from "react"

import { cn } from "@/lib/utils"

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspect?: number
}

function Image({ src, className, aspect, ...props }: Props) {
  return src ? (
    <img
      className={cn("image block w-full", className)}
      style={{ aspectRatio: aspect }}
      src={src}
      {...props}
    />
  ) : null
}

export { Image }
