import * as React from "react"

import { cn } from "@/lib/utils"

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {}

function Image({ src, className, ...props }: Props) {
  return src ? (
    <img className={cn("image block w-full", className)} src={src} {...props} />
  ) : null
}

export { Image }
