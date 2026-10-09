import * as React from "react"
import { cn } from "cn"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Section, SectionContainer } from "@/components/ui/section"

function Articles4({
  title,
  description,
  articles,
  ...props
}: React.ComponentProps<"section"> & {
  title: string
  description: string
  articles: {
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
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {title}
          </h2>
          <p className="mt-2 text-base leading-7 text-balance text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => {
            const className = cn(
              "flex h-full flex-col gap-4 rounded-xl border p-6",
              article.href != null &&
                "group transition-colors hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
            )
            const content = (
              <>
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {article.category}
                  </p>
                  <h3 className="line-clamp-2 text-xl leading-snug font-semibold text-foreground">
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

export { Articles4 }
