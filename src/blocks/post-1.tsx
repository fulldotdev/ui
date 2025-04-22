import * as React from "react"

import { cn } from "@/lib/utils"
import { Heading } from "@/components/ui/heading"
import { Paragraph } from "@/components/ui/paragraph"
import { Prose } from "@/components/ui/prose"

export interface Post1Props extends React.ComponentProps<"section"> {
  level?: number
  title: string
  description?: string
  image?: {
    src: string
    alt: string
  }
}

function Post1({
  className,
  level = 1,
  title,
  description,
  image,
  children,
  ...props
}: Post1Props) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="mx-auto flex w-full max-w-screen-md flex-col px-4 md:px-12">
        <Prose>
          <Heading level={level}>{title}</Heading>
          {description && <Paragraph>{description}</Paragraph>}
          {image && <img className="rounded-lg" {...image} />}
          {children}
        </Prose>
      </div>
    </section>
  )
}

export { Post1 }
