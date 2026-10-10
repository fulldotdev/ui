import * as React from "react"
import { cn } from "cn"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Section, SectionContainer } from "@/components/ui/section"

function Articles2({
  title,
  description,
  featured,
  articles,
  ...props
}: React.ComponentProps<"section"> & {
  title: string
  description: string
  featured: {
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
  }
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
  const featuredClassName = cn(
    "grid gap-6 rounded-xl lg:grid-cols-2 lg:items-center lg:pr-4",
    featured.href != null &&
      "group transition-colors hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
  )
  const featuredContent = (
    <>
      <img
        src={featured.image.src}
        srcSet={featured.image.srcSet}
        alt={featured.image.alt}
        width={featured.image.width}
        height={featured.image.height}
        sizes="(min-width: 80rem) 616px, (min-width: 64rem) 50vw, 100vw"
        loading="lazy"
        decoding="async"
        className="aspect-[4/3] rounded-lg object-cover transition-opacity group-hover:opacity-85"
      />
      <div className="flex flex-col gap-4">
        <Badge variant="outline" className="w-fit">
          {featured.category}
        </Badge>
        <h3 className="text-2xl leading-tight font-semibold text-foreground sm:text-3xl">
          {featured.title}
        </h3>
        <p className="text-base leading-7 text-muted-foreground">
          {featured.description}
        </p>
        <div className="flex items-center gap-3">
          <Avatar aria-hidden="true">
            <AvatarImage src={featured.author.image} alt="" />
            <AvatarFallback>{featured.author.initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-sm font-medium">{featured.author.name}</p>
            <p className="text-xs text-muted-foreground">
              {featured.author.date}
            </p>
          </div>
        </div>
      </div>
    </>
  )

  return (
    <Section {...props}>
      <SectionContainer className="flex flex-col gap-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {title}
          </h2>
          <p className="mt-2 text-base leading-7 text-balance text-muted-foreground">
            {description}
          </p>
        </div>

        {featured.href != null ? (
          <a href={featured.href} className={featuredClassName}>
            {featuredContent}
          </a>
        ) : (
          <div className={featuredClassName}>{featuredContent}</div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => {
            const className = cn(
              "flex h-full flex-col gap-4 rounded-xl p-4",
              article.href != null &&
                "group transition-colors hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
            )
            const content = (
              <>
                <img
                  src={article.image.src}
                  srcSet={article.image.srcSet}
                  alt={article.image.alt}
                  width={article.image.width}
                  height={article.image.height}
                  sizes="(min-width: 64rem) 26rem, (min-width: 48rem) 50vw, 100vw"
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

export { Articles2 }
