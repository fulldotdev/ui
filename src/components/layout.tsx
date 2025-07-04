import * as React from "react"

import "@/styles/globals.css"

function Layout({
  children,
  seo,
}: {
  children: React.ReactNode
  seo?: {
    title?: string
    description?: string
  }
}) {
  return (
    <html className="text-foreground bg-background h-full w-full font-sans text-base scheme-light dark:scheme-dark">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{seo?.title}</title>
        <meta name="description" content={seo?.description} />
        <meta name="robots" content="index, follow" />
      </head>
      <body>{children}</body>
    </html>
  )
}

export { Layout }
