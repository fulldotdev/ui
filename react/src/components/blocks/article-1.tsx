import * as React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Section, SectionContainer } from "@/components/ui/section"

function Article1({
  title,
  description,
  author,
  image,
  children,
  ...props
}: React.ComponentProps<"section"> & {
  title: string
  description: string
  author: {
    image?: string
    initials: string
    name: string
    date: string
  }
  image: {
    src: string
    srcSet?: string
    alt: string
    width?: number
    height?: number
  }
}) {
  return (
    <Section {...props}>
      <SectionContainer className="max-w-2xl">
        <article className="flex flex-col gap-8">
          <header className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl">
                {title}
              </h1>
              <p className="text-lg leading-8 text-balance text-muted-foreground">
                {description}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Avatar size="lg" aria-hidden="true">
                <AvatarImage src={author.image} alt="" />
                <AvatarFallback>{author.initials}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-sm font-medium">{author.name}</p>
                <p className="text-xs text-muted-foreground">{author.date}</p>
              </div>
            </div>
          </header>
          <img
            src={image.src}
            srcSet={image.srcSet}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(min-width: 42rem) 42rem, 100vw"
            loading="eager"
            fetchPriority="high"
            className="aspect-[16/10] w-full rounded-xl object-cover"
          />
          <div className="flex flex-col gap-6 text-base leading-8">
            {children}
          </div>
        </article>
      </SectionContainer>
    </Section>
  )
}

export { Article1 }
