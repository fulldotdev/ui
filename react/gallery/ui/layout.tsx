import * as React from "react"
import { renderToStaticMarkup } from "react-dom/server"

import {
  Layout,
  LayoutBody,
  LayoutHead,
  LayoutMain,
} from "@/components/ui/layout"

function Example({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
      <div className="flex flex-wrap items-start gap-4">{children}</div>
    </section>
  )
}

// A layout renders the html, head and body elements, so the gallery shows
// the document it renders instead of nesting a second document in the page.
const documentMarkup = renderToStaticMarkup(
  <Layout lang="en">
    <LayoutHead
      name="Acme"
      title="Pricing | Acme"
      description="Plans for every team size."
      canonical="https://example.com/pricing/"
      image={{
        src: "/og/pricing.png",
        alt: "Acme pricing",
        width: 1200,
        height: 630,
      }}
      noindex={false}
    />
    <LayoutBody>
      <LayoutMain>
        <h1>Pricing</h1>
      </LayoutMain>
    </LayoutBody>
  </Layout>
)

export default function Demo() {
  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Main">
        <LayoutMain className="w-full rounded-xl border p-6">
          <p className="text-sm text-muted-foreground">
            LayoutMain is a container query root for the page content.
          </p>
        </LayoutMain>
      </Example>
      <Example title="Rendered document">
        <pre className="w-full overflow-x-auto rounded-xl border bg-muted/40 p-4 text-xs whitespace-pre-wrap">
          {documentMarkup.replaceAll("><", ">\n<")}
        </pre>
      </Example>
    </div>
  )
}
