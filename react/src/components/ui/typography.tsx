import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cn } from "cn"

import "./typeset.css"

type TypographySize = "sm" | "default" | "lg"

const sizes = (sm: string, md: string, lg: string) => ({
  sm,
  default: md,
  lg,
})

function Typography({
  className,
  size = "default",
  render,
  ...props
}: useRender.ComponentProps<"div"> & { size?: TypographySize }) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          "typeset",
          sizes(
            "[--typeset-flow:1.125em] [--typeset-leading:1.7] [--typeset-size:0.875rem]",
            "[--typeset-flow:1.25em] [--typeset-leading:1.75] [--typeset-size:1rem]",
            "[--typeset-flow:1.5em] [--typeset-leading:1.8] [--typeset-size:1.125rem]"
          )[size],
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "typography",
      size,
    },
  })
}

const typographyH1Sizes = sizes("text-3xl", "text-4xl", "text-5xl")

function TypographyH1({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"h1"> & { size?: TypographySize }) {
  return (
    <h1
      data-slot="typography-h1"
      data-size={size}
      className={cn(
        "cn-typography-h1 scroll-m-20 font-heading text-balance",
        typographyH1Sizes[size],
        className
      )}
      {...props}
    />
  )
}

const typographyH2Sizes = sizes("text-2xl", "text-3xl", "text-4xl")

function TypographyH2({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"h2"> & { size?: TypographySize }) {
  return (
    <h2
      data-slot="typography-h2"
      data-size={size}
      className={cn(
        "cn-typography-h2 scroll-m-20 font-heading first:mt-0",
        typographyH2Sizes[size],
        className
      )}
      {...props}
    />
  )
}

const typographyH3Sizes = sizes("text-xl", "text-2xl", "text-3xl")

function TypographyH3({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"h3"> & { size?: TypographySize }) {
  return (
    <h3
      data-slot="typography-h3"
      data-size={size}
      className={cn(
        "cn-typography-h3 scroll-m-20 font-heading",
        typographyH3Sizes[size],
        className
      )}
      {...props}
    />
  )
}

const typographyH4Sizes = sizes("text-lg", "text-xl", "text-2xl")

function TypographyH4({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"h4"> & { size?: TypographySize }) {
  return (
    <h4
      data-slot="typography-h4"
      data-size={size}
      className={cn(
        "cn-typography-h4 scroll-m-20 font-heading",
        typographyH4Sizes[size],
        className
      )}
      {...props}
    />
  )
}

const typographyPSizes = sizes("text-sm", "text-base", "text-lg")

function TypographyP({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"p"> & { size?: TypographySize }) {
  return (
    <p
      data-slot="typography-p"
      data-size={size}
      className={cn(
        "leading-7 [&:not(:first-child)]:mt-6",
        typographyPSizes[size],
        className
      )}
      {...props}
    />
  )
}

const typographyLeadSizes = sizes("text-base", "text-lg", "text-xl")

function TypographyLead({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"p"> & { size?: TypographySize }) {
  return (
    <p
      data-slot="typography-lead"
      data-size={size}
      className={cn(
        "text-muted-foreground",
        typographyLeadSizes[size],
        className
      )}
      {...props}
    />
  )
}

const typographyASizes = sizes("text-sm", "text-base", "text-lg")

function TypographyA({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"a"> & { size?: TypographySize }) {
  return (
    <a
      data-slot="typography-a"
      data-size={size}
      className={cn(
        "font-medium text-primary underline underline-offset-4",
        typographyASizes[size],
        className
      )}
      {...props}
    />
  )
}

const typographyBlockquoteSizes = sizes("text-sm", "text-base", "text-lg")

function TypographyBlockquote({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"blockquote"> & { size?: TypographySize }) {
  return (
    <blockquote
      data-slot="typography-blockquote"
      data-size={size}
      className={cn(
        "mt-6 border-s-2 ps-6 italic",
        typographyBlockquoteSizes[size],
        className
      )}
      {...props}
    />
  )
}

const typographyInlineCodeSizes = sizes("text-xs", "text-sm", "text-base")

function TypographyInlineCode({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"code"> & { size?: TypographySize }) {
  return (
    <code
      data-slot="typography-inline-code"
      data-size={size}
      className={cn(
        "cn-typography-inline-code relative px-[0.3rem] py-[0.2rem]",
        typographyInlineCodeSizes[size],
        className
      )}
      {...props}
    />
  )
}

const typographyListItemSizes = sizes("text-sm", "text-base", "text-lg")

function TypographyListItem({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"li"> & { size?: TypographySize }) {
  return (
    <li
      data-slot="typography-list-item"
      data-size={size}
      className={cn("mt-2", typographyListItemSizes[size], className)}
      {...props}
    />
  )
}

const typographyTableRowSizes = sizes("text-sm", "text-base", "text-lg")

function TypographyTableRow({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"tr"> & { size?: TypographySize }) {
  return (
    <tr
      data-slot="typography-table-row"
      data-size={size}
      className={cn(
        "m-0 border-t p-0 even:bg-muted",
        typographyTableRowSizes[size],
        className
      )}
      {...props}
    />
  )
}

const typographyTableHeadSizes = sizes("text-sm", "text-base", "text-lg")

function TypographyTableHead({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"th"> & { size?: TypographySize }) {
  return (
    <th
      data-slot="typography-table-head"
      data-size={size}
      className={cn(
        "border-b border-border px-4 py-3 text-start font-semibold [&[align=center]]:text-center [&[align=left]]:text-left [&[align=right]]:text-right",
        typographyTableHeadSizes[size],
        className
      )}
      {...props}
    />
  )
}

const typographyTableCellSizes = sizes("text-sm", "text-base", "text-lg")

function TypographyTableCell({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"td"> & { size?: TypographySize }) {
  return (
    <td
      data-slot="typography-table-cell"
      data-size={size}
      className={cn(
        "border-t border-border px-4 py-3 text-start align-middle [&[align=center]]:text-center [&[align=left]]:text-left [&[align=right]]:text-right",
        typographyTableCellSizes[size],
        className
      )}
      {...props}
    />
  )
}

const typographyListSizes = sizes("text-sm", "text-base", "text-lg")

// The list type changes its markers, so it is a prop instead of a render.
function TypographyList({
  className,
  as = "ul",
  size = "default",
  ...props
}: React.ComponentProps<"ol"> & {
  as?: "ul" | "ol"
  size?: TypographySize
}) {
  // A <ul> takes the attributes of an <ol> except start and reversed.
  const Tag = as as "ol"
  return (
    <Tag
      data-slot="typography-list"
      data-size={size}
      data-ordered={as === "ol" ? "" : undefined}
      className={cn(
        "my-6 ms-6",
        as === "ol" ? "list-decimal" : "list-disc",
        typographyListSizes[size],
        className
      )}
      {...props}
    />
  )
}

const typographyTableSizes = sizes("text-sm", "text-base", "text-lg")

function TypographyTable({
  className,
  containerClassName,
  size = "default",
  ...props
}: React.ComponentProps<"table"> & {
  containerClassName?: string
  size?: TypographySize
}) {
  return (
    <div
      data-slot="typography-table-container"
      data-size={size}
      className={cn(
        "cn-typography-table my-6 w-full overflow-x-auto",
        containerClassName
      )}
    >
      <table
        data-slot="typography-table"
        data-size={size}
        className={cn(
          "w-full border-collapse",
          typographyTableSizes[size],
          className
        )}
        {...props}
      />
    </div>
  )
}

export {
  Typography,
  TypographyA,
  TypographyBlockquote,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyInlineCode,
  TypographyLead,
  TypographyList,
  TypographyListItem,
  TypographyP,
  TypographyTable,
  TypographyTableCell,
  TypographyTableHead,
  TypographyTableRow,
}
