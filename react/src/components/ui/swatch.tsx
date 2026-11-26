import * as React from "react"
import { cn } from "cn"

function Swatch({
  className,
  color,
  image,
  style,
  ...props
}: React.ComponentProps<"span"> & {
  color?: string
  image?: string
}) {
  return (
    <span
      data-slot="swatch"
      aria-hidden="true"
      className={cn(
        "cn-swatch inline-block size-4 shrink-0 bg-cover bg-center",
        className
      )}
      style={{
        backgroundColor: color,
        backgroundImage: image ? `url(${JSON.stringify(image)})` : undefined,
        ...style,
      }}
      {...props}
    />
  )
}

export { Swatch }
