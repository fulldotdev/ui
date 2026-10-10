import * as React from "react"

import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import { Toaster } from "@/components/ui/toast"

// The docs show React previews in an iframe of this app, one per style build.
// Routes are #/examples/<family>/<name> for the official shadcn/ui examples,
// #/blocks/<name> for a block and #/ui/<name> for a Fulldev component demo.
// A query after the route belongs to the demo.
const examples = import.meta.glob<Record<string, unknown>>(
  "../src/components/examples/*/*.tsx"
)
const blocks = import.meta.glob<{ default: React.ComponentType }>(
  "./blocks/*.tsx"
)
const ui = import.meta.glob<{ default: React.ComponentType }>("./ui/*.tsx")

type Preview = { kind: string; Demo?: React.ComponentType }

function readRoute() {
  const hash = window.location.hash
  return hash.startsWith("#/") ? hash.slice(2).split("?")[0] : ""
}

async function load(route: string): Promise<Preview> {
  const [kind, ...rest] = route.split("/")
  const name = rest.join("/")
  if (kind === "examples") {
    const module = await examples[`../src/components/examples/${name}.tsx`]?.()
    // Each official example file exports its one example component.
    const Demo = Object.values(module ?? {}).find(
      (value) => typeof value === "function"
    ) as React.ComponentType | undefined
    return { kind, Demo }
  }
  const modules = kind === "blocks" ? blocks : kind === "ui" ? ui : {}
  const module = await modules[`./${kind}/${name}.tsx`]?.()
  return { kind, Demo: module?.default }
}

// Send the page height to the docs, which size the iframe to it.
function useReportHeight() {
  React.useEffect(() => {
    if (window.parent === window) return
    const report = () =>
      window.parent.postMessage(
        {
          type: "fulldev:preview-height",
          height: document.body.getBoundingClientRect().height,
        },
        window.location.origin
      )
    const observer = new ResizeObserver(report)
    observer.observe(document.body)
    return () => observer.disconnect()
  }, [])
}

// Demos that render a page's main element themselves.
const ownMain = new Set(["ui/layout", "ui/sidebar", "blocks/sidebar-1"])
// Official examples that fill the page (a block preview upstream). The docs
// give their frame a fixed height, so they render without padding.
const fullPage = new Set(["examples/sidebar/sidebar-demo"])

export function App() {
  const [route, setRoute] = React.useState(readRoute)
  const [preview, setPreview] = React.useState<Preview & { route: string }>()
  useReportHeight()
  React.useEffect(() => {
    const onChange = () => setRoute(readRoute())
    window.addEventListener("hashchange", onChange)
    return () => window.removeEventListener("hashchange", onChange)
  }, [])
  React.useEffect(() => {
    let current = true
    load(route).then((next) => {
      if (current) setPreview({ ...next, route })
    })
    return () => {
      current = false
    }
  }, [route])
  if (preview?.route !== route) return null
  const { kind, Demo } = preview
  if (!Demo) {
    return (
      <p className="p-6 text-sm text-muted-foreground">
        No preview for {route || "this address"}.
      </p>
    )
  }
  if (fullPage.has(route)) return <Demo />
  const Main = ownMain.has(route) ? "div" : "main"
  return (
    <Main
      className={
        kind === "examples"
          ? "flex min-h-[22.5rem] w-full items-center justify-center p-6 md:p-10"
          : "@container flex flex-col"
      }
    >
      <Demo />
      {/* Official examples call toast() of Sonner or toast.add() of Toast,
      which render in the Toaster of the app root layout. The Fulldev demos
      render their own. */}
      {kind === "examples" && (
        <>
          <Toaster />
          <SonnerToaster />
        </>
      )}
    </Main>
  )
}
