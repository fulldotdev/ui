import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cn } from "cn"

function Toc({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="toc"
      className={cn("flex flex-col gap-3", className)}
      {...props}
    />
  )
}

function TocTitle({
  className,
  render,
  ...props
}: useRender.ComponentProps<"p">) {
  return useRender({
    defaultTagName: "p",
    props: mergeProps<"p">({ className: cn("cn-toc-title", className) }, props),
    render,
    state: {
      slot: "toc-title",
    },
  })
}

function TocMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="toc-menu"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  )
}

function TocMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="toc-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  )
}

function TocMenuLink({
  className,
  depth = 2,
  active = false,
  ...props
}: React.ComponentProps<"a"> & {
  depth?: number
  active?: boolean
}) {
  return (
    <a
      data-slot="toc-menu-link"
      data-depth={depth}
      data-active={active ? "true" : undefined}
      aria-current={active ? "location" : undefined}
      className={cn(
        "cn-toc-menu-link block text-muted-foreground transition-colors hover:text-foreground data-[active=true]:text-foreground",
        depth === 3 && "ps-4",
        depth >= 4 && "ps-8",
        className
      )}
      {...props}
    />
  )
}

export { Toc, TocMenu, TocMenuItem, TocMenuLink, TocTitle }
