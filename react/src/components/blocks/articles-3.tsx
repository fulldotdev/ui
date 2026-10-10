import * as React from "react"
import { cn } from "cn"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Section,
  SectionContainer,
  SectionTitle,
} from "@/components/ui/section"

function Articles3({
  title,
  articles,
  ...props
}: React.ComponentProps<"section"> & {
  title: string
  articles: {
    image: {
      src: string
      srcSet?: string
      alt: string
      width?: number
      height?: number
    }
    category: string
    title: string
    description: string
    href?: string
    author: {
      image?: string
      initials: string
      name: string
      date: string
    }
  }[]
}) {
  return (
    <Section {...props}>
      <SectionContainer className="flex flex-col gap-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-4">
            <SectionTitle>{title}</SectionTitle>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {articles.map((article) => {
            const className = cn(
              "flex h-full flex-col gap-4 rounded-xl bg-muted/50 p-4",
              article.href != null &&
                "group transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
            )
            const content = (
              <>
                <img
                  src={article.image.src}
                  srcSet={article.image.srcSet}
                  alt={article.image.alt}
                  width={article.image.width}
                  height={article.image.height}
                  sizes="(min-width: 64rem) 18rem, (min-width: 48rem) 50vw, 100vw"
                  loading="lazy"
                  decoding="async"
                  className="-mx-4 -mt-4 aspect-[16/9] w-[calc(100%+2rem)] max-w-none rounded-lg object-cover transition-opacity group-hover:opacity-85"
                />
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {article.category}
                  </p>
                  <h3 className="line-clamp-2 text-lg leading-snug font-semibold text-foreground">
                    {article.title}
                  </h3>
                  <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
                    {article.description}
                  </p>
                </div>
                <div className="mt-auto flex items-center gap-3">
                  <Avatar aria-hidden="true">
                    <AvatarImage src={article.author.image} alt="" />
                    <AvatarFallback>{article.author.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">{article.author.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {article.author.date}
                    </p>
                  </div>
                </div>
              </>
            )
            return article.href != null ? (
              <a
                key={article.href + article.title}
                href={article.href}
                className={className}
              >
                {content}
              </a>
            ) : (
              <div key={article.title} className={className}>
                {content}
              </div>
            )
          })}
        </div>
      </SectionContainer>
    </Section>
  )
}

export { Articles3 }
