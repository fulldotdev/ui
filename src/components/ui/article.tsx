import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function Article({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <article className={cn("relative w-full py-16", className)} {...props} />
  )
}

function ArticleContainer({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-screen-md px-4 lg:px-12", className)}
      {...props}
    />
  )
}

export const articleSplitVariants = cva(
  "grid w-full gap-y-8 md:grid-cols-2 md:gap-x-8 lg:gap-x-16 items-start",
  {
    variants: {
      reverse: {
        true: "md:[&>*:first-child]:order-last md:[&>*:last-child]:order-first",
        false: null,
      },
    },
  }
)

function ArticleSplit({
  className,
  reverse,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof articleSplitVariants>) {
  return (
    <div
      className={cn(articleSplitVariants({ reverse }), className)}
      {...props}
    />
  )
}

function ArticleContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "prose",
        "text-foreground flex w-full max-w-2xl flex-col",
        "child:not-first:mt-4",
        "heading:scroll-mt-20 heading:not-first:mt-8 heading:text-pretty heading:font-semibold heading:tracking-tight",
        "h1:text-4xl lg:h1:text-5xl",
        "h2:text-3xl",
        "h3:text-2xl",
        "h4:text-xl",
        "h5:text-lg",
        "h6:text-base",
        "p:mt-4 p:leading-[1.8]",
        "img:p:rounded-lg img:rounded-lg",
        "list:ml-4 list:mt-4 list:space-y-2 ul:list-disc ol:list-decimal",
        "[&_a[href]]:text-primary [&_a[href]]:hover:underline",
        className
      )}
      {...props}
    />
  )
}

function ArticleTitle({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance",
        className
      )}
      {...props}
    />
  )
}

function ArticleDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <div
      className={cn("text-muted-foreground text-xl text-pretty", className)}
      {...props}
    />
  )
}

function ArticleTagline({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <div
      className={cn(
        "tagline text-primary leading-none font-medium text-pretty",
        className
      )}
      {...props}
    />
  )
}

export {
  Article,
  ArticleContainer,
  ArticleContent,
  ArticleTitle,
  ArticleDescription,
  ArticleTagline,
  ArticleSplit,
}
