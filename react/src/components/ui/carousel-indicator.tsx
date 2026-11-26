"use client"

import * as React from "react"
import { cn } from "cn"

import { useCarousel } from "@/components/ui/carousel"

function CarouselIndicator({
  className,
  index,
  onClick,
  "aria-label": ariaLabel = `Go to slide ${index + 1}`,
  ...props
}: React.ComponentProps<"button"> & {
  index: number
}) {
  const { api, opts } = useCarousel()
  const [selected, setSelected] = React.useState(opts?.startIndex ?? 0)

  React.useEffect(() => {
    if (!api) return
    const update = () => setSelected(api.selectedScrollSnap())
    update()
    api.on("select", update)
    api.on("reInit", update)
    return () => {
      api.off("select", update)
      api.off("reInit", update)
    }
  }, [api])

  const active = selected === index

  return (
    <button
      type="button"
      data-slot="carousel-indicator"
      data-index={index}
      data-state={active ? "active" : "inactive"}
      aria-current={active ? "true" : undefined}
      aria-label={ariaLabel}
      className={cn(
        "cn-carousel-indicator relative block shrink-0 cursor-pointer overflow-hidden [&>img]:size-full [&>img]:object-cover",
        className
      )}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
        api?.scrollTo(index, reduce.matches)
      }}
      {...props}
    />
  )
}

export { CarouselIndicator }
