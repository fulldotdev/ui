import * as React from "react"
import { cn } from "cn"

function Layout({
  className,
  lang = "en",
  ...props
}: React.ComponentProps<"html">) {
  return (
    <html
      data-slot="layout"
      lang={lang}
      // The theme provider sets the `dark` class before React hydrates.
      suppressHydrationWarning
      className={cn(
        "overscroll-none scroll-smooth bg-background text-foreground has-data-[variant=inset]:bg-sidebar",
        className
      )}
      {...props}
    />
  )
}

type LayoutImage = {
  src: string
  alt?: string
  width?: number
  height?: number
  type?: string
}

// Page metadata for search engines and link previews. `canonical` is the
// page's absolute URL; relative image sources resolve against it.
function LayoutHead({
  children,
  name,
  title,
  description,
  image,
  noindex,
  nofollow,
  canonical,
  ...props
}: React.ComponentProps<"head"> & {
  name?: string
  title?: string
  description?: string
  image?: LayoutImage
  noindex?: boolean
  nofollow?: boolean
  canonical?: string
}) {
  const imageUrl = image?.src
    ? canonical
      ? new URL(image.src, canonical).toString()
      : image.src
    : undefined
  const robots = [
    noindex === undefined ? "" : noindex ? "noindex" : "index",
    nofollow === undefined ? "" : nofollow ? "nofollow" : "follow",
  ]
    .filter(Boolean)
    .join(",")

  return (
    <head data-slot="layout-head" {...props}>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {canonical && <link rel="canonical" href={canonical} />}
      {robots && <meta name="robots" content={robots} />}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:type" content="website" />
      {name && <meta property="og:site_name" content={name} />}
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      {imageUrl?.startsWith("https://") && (
        <meta property="og:image:secure_url" content={imageUrl} />
      )}
      {imageUrl && image?.alt && (
        <meta property="og:image:alt" content={image.alt} />
      )}
      {imageUrl && image?.width && (
        <meta property="og:image:width" content={String(image.width)} />
      )}
      {imageUrl && image?.height && (
        <meta property="og:image:height" content={String(image.height)} />
      )}
      {imageUrl && image?.type && (
        <meta property="og:image:type" content={image.type} />
      )}
      <meta
        name="twitter:card"
        content={imageUrl ? "summary_large_image" : "summary"}
      />
      {children}
    </head>
  )
}

function LayoutBody({ className, ...props }: React.ComponentProps<"body">) {
  return (
    <body
      data-slot="layout-body"
      className={cn(
        "overscroll-none bg-background font-sans text-foreground antialiased",
        className
      )}
      {...props}
    />
  )
}

function LayoutMain({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="layout-main"
      className={cn(
        "@container flex flex-col in-[[data-slot=sidebar-inset]]:rounded-[inherit]",
        className
      )}
      {...props}
    />
  )
}

export { Layout, LayoutBody, LayoutHead, LayoutMain }
