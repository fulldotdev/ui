import * as React from "react"

import { placeholderImage } from "@/lib/placeholder-image"
import { AspectRatio } from "@/components/ui/aspect-ratio"

function Example({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
      <div className="flex flex-wrap items-start gap-4">{children}</div>
    </section>
  )
}

export default function Demo() {
  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="16 by 9">
        <div className="w-full max-w-md">
          <AspectRatio
            ratio={16 / 9}
            className="overflow-hidden rounded-lg bg-muted"
          >
            <img
              src={placeholderImage.src}
              alt="Landscape placeholder"
              className="size-full object-cover"
            />
          </AspectRatio>
        </div>
      </Example>
      <Example title="Square and portrait">
        <div className="w-40">
          <AspectRatio
            ratio={1}
            className="overflow-hidden rounded-lg bg-muted"
          >
            <img
              src={placeholderImage.src}
              alt="Square placeholder"
              className="size-full object-cover"
            />
          </AspectRatio>
        </div>
        <div className="w-32">
          <AspectRatio
            ratio={9 / 16}
            className="overflow-hidden rounded-lg bg-muted"
          >
            <img
              src={placeholderImage.src}
              alt="Portrait placeholder"
              className="size-full object-cover"
            />
          </AspectRatio>
        </div>
      </Example>
      <Example title="Without media">
        <div className="w-full max-w-xs">
          <AspectRatio
            ratio={4 / 3}
            className="flex items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground"
          >
            4 by 3
          </AspectRatio>
        </div>
      </Example>
    </div>
  )
}
