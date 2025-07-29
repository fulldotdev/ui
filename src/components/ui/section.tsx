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

export const sectionSplitVariants = cva(
  "grid w-full gap-y-8 auto-cols-fr lg:grid-flow-col lg:gap-x-16 items-start",
  {
    variants: {
      reverse: {
        true: "lg:[&>*:first-child]:order-last lg:[&>*:last-child]:order-first",
        false: null,
      },
      sticky: {
        true: "lg:*:sticky lg:*:top-16 items-start",
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
        "columns-3xs gap-4 space-y-6 *:break-inside-avoid",
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
        "grid w-full grid-cols-[repeat(auto-fit,minmax(260px,1fr))] items-start gap-6",
        className
      )}
      {...props}
    />
  )
}

const sectionContentVariants = cva(
  [
    "w-full max-w-2xl",
    "[&_p]:leading-[1.8] [&_p]:not-first:mt-4",
    "[&_ul]:list-inside [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:not-first:mt-4",
    "[&_ol]:list-inside [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:not-first:mt-4",
    "[&_a]:text-primary [&_a]:hover:underline",
    "[&_:is(h1,h2,h3,h4,h5,h6)]:scroll-mt-20 [&_:is(h1,h2,h3,h4,h5,h6)]:not-first:mt-12 [&_:is(h1,h2,h3,h4,h5,h6)]:text-pretty [&_:is(h1,h2,h3,h4,h5,h6)]:font-semibold [&_:is(h1,h2,h3,h4,h5,h6)]:leading-[1.1]",
    "[&_img]:rounded-lg [&_img]:not-first:mt-12",
  ],
  {
    variants: {
      size: {
        sm: "text-sm [&_h1]:text-2xl [&_h2]:text-xl [&_h3]:text-lg [&_h4]:text-base [&_h5]:text-sm [&_h6]:text-sm max-w-xl",
        default:
          "[&_h1]:text-4xl [&_h2]:text-3xl [&_h3]:text-2xl [&_h4]:text-xl [&_h5]:text-lg [&_h6]:text-base max-w-2xl",
        lg: "text-lg [&_h1]:text-5xl [&_h2]:text-4xl [&_h3]:text-3xl [&_h4]:text-2xl [&_h5]:text-xl [&_h6]:text-lg max-w-3xl",
        xl: "text-xl [&_h1]:text-6xl [&_h2]:text-5xl [&_h3]:text-4xl [&_h4]:text-3xl [&_h5]:text-2xl [&_h6]:text-xl max-w-4xl",
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
  SectionFooter,
  SectionSplit,
  SectionMasonry,
  SectionGrid,
  SectionContent,
  SectionTitle,
  SectionDescription,
  SectionTagline,
}
