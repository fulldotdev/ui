import * as React from "react"

import { cn } from "@/lib/utils"
import { Description } from "@/components/description"
import { Image } from "@/components/image"
import { Prose } from "@/components/prose"
import { Title } from "@/components/title"

export interface Post1Props extends React.ComponentProps<"section"> {
  level?: number
  title?: string
  description?: string
  image?: React.ComponentProps<typeof Image>
  children?: React.ReactNode
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
      <div className="mx-auto w-full max-w-screen-md px-4 md:px-12">
        <div className="flex flex-col">
          <Prose>
            {title && <Title level={level}>{title}</Title>}
            {description && <Description>{description}</Description>}
            {image && <Image className="rounded-lg" {...image} />}
            {children}
          </Prose>
        </div>
      </div>
    </section>
  )
}

export { Post1 }
