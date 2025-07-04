import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function Section({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props} />
  )
}

function SectionContainer({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-screen-xl px-4 lg:px-8", className)}
      {...props}
    />
  )
}

const sectionContentVariants = cva(
  [
    "text-pretty max-w-2xl text-left text-foreground !leading-[1.75] relative z-1",
    "[&_*]:not-first:mt-4",
    "[&_:is(h1,h2,h3,h4,h5,h6)]:scroll-mt-20 [&_:is(h1,h2,h3,h4,h5,h6)]:font-semibold [&_:is(h1,h2,h3,h4,h5,h6)]:tracking-tight [&_:is(h1,h2,h3,h4,h5,h6)]:text-foreground",
    "[&_blockquote]:border-l-2 [&_blockquote]:pl-6 [&_blockquote]:italic",
    "[&_a]:text-primary [&_a]:hover:underline",
    "list:ml-4 list:mt-4  ul:list-['✓'] ol:list-decimal li:pl-2 li:not-first:mt-1",
  ],
  {
    variants: {
      size: {
        xs: "text-xs [&_:is(h1,h2,h3,h4,h5,h6)]:text-xs",
        sm: "text-sm [&_:is(h1,h2,h3,h4,h5,h6)]:text-sm",
        default: "text-base [&_:is(h1,h2,h3,h4,h5,h6)]:text-base",
        lg: "text-base [&_:is(h1,h2,h3,h4,h5,h6)]:text-lg",
        xl: "text-base [&_:is(h1,h2,h3,h4,h5,h6)]:text-xl",
        "2xl": "text-base [&_:is(h1,h2,h3,h4,h5,h6)]:text-2xl",
        "3xl": "text-base [&_:is(h1,h2,h3,h4,h5,h6)]:text-3xl",
        "4xl": "text-base [&_:is(h1,h2,h3,h4,h5,h6)]:text-4xl",
        "5xl":
          "text-base md:text-lg [&_:is(h1,h2,h3,h4,h5,h6)]:text-4xl lg:[&_:is(h1,h2,h3,h4,h5,h6)]:text-5xl",
        "6xl":
          "text-lg md:text-xl [&_:is(h1,h2,h3,h4,h5,h6)]:text-5xl lg:[&_:is(h1,h2,h3,h4,h5,h6)]:text-6xl",
        "7xl":
          "text-lg md:text-xl [&_:is(h1,h2,h3,h4,h5,h6)]:text-5xl lg:[&_:is(h1,h2,h3,h4,h5,h6)]:text-7xl",
        "8xl":
          "text-lg md:text-xl [&_:is(h1,h2,h3,h4,h5,h6)]:text-5xl lg:[&_:is(h1,h2,h3,h4,h5,h6)]:text-8xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function SectionContent({
  className,
  size,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof sectionContentVariants>) {
  return (
    <div
      className={cn(sectionContentVariants({ size }), className)}
      {...props}
    />
  )
}

function SectionFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("inline-flex flex-wrap gap-2", className)} {...props} />
  )
}

export const sectionSplitVariants = cva(
  "grid w-full gap-y-8 auto-cols-fr lg:grid-flow-col lg:gap-x-16 items-start",
  {
    variants: {
      reverse: {
        true: "lg:[&>*:first-child]:order-last lg:[&>*:last-child]:order-first",
        false: null,
      },
      sticky: {
        true: "lg:*:sticky lg:*:top-24",
        false: null,
      },
    },
    defaultVariants: {
      sticky: false,
      reverse: false,
    },
  }
)

function SectionSplit({
  className,
  reverse,
  sticky,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof sectionSplitVariants>) {
  return (
    <div
      className={cn(sectionSplitVariants({ reverse, sticky }), className)}
      {...props}
    />
  )
}

function SectionMasonry({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "columns-3xs gap-4 space-y-6 [&>*]:break-inside-avoid",
        className
      )}
      {...props}
    />
  )
}

function SectionGrid({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-8",
        className
      )}
      {...props}
    />
  )
}

function SectionProse({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "prose",
        "flex w-full max-w-2xl flex-col",
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

function SectionTitle({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight text-balance",
        className
      )}
      {...props}
    />
  )
}

function SectionDescription({
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

function SectionTagline({ className, ...props }: React.ComponentProps<"p">) {
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
  Section,
  SectionContainer,
  SectionContent,
  SectionFooter,
  SectionSplit,
  SectionMasonry,
  SectionGrid,
  SectionProse,
  SectionTitle,
  SectionDescription,
  SectionTagline,
}
