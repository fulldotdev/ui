import * as React from "react"

// The docs show React previews in an iframe of this app, one per style build.
// Routes are #/blocks/<name> for a block and #/ui/<name> for a Fulldev extra.
// A query after the route belongs to the demo.
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
  const modules = kind === "blocks" ? blocks : kind === "ui" ? ui : {}
  const module = await modules[`./${kind}/${name}.tsx`]?.()
  return { kind, Demo: module?.default }
}

// Size the docs iframe to this page. The docs share the origin, so the frame
// sets its own height, bounded so a runaway layout cannot grow the page
// without end. Full-page previews keep their fixed height.
function useFrameHeight() {
  React.useEffect(() => {
    const frame = window.frameElement as HTMLElement | null
    if (!frame || frame.hasAttribute("data-full-page")) return
    const min = Number(frame.dataset.minHeight ?? 120)
    const observer = new ResizeObserver(() => {
      const height = document.body.getBoundingClientRect().height
      frame.style.height = `${Math.min(Math.max(Math.ceil(height), min), 4000)}px`
    })
    observer.observe(document.body)
    return () => observer.disconnect()
  }, [])
}

// Demos that render a page's main element themselves.
const ownMain = new Set(["ui/layout", "blocks/sidebar-1"])

export function App() {
  const [route, setRoute] = React.useState(readRoute)
  const [preview, setPreview] = React.useState<Preview & { route: string }>()
  useFrameHeight()
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
  const { Demo } = preview
  if (!Demo) {
    return (
      <p className="p-6 text-sm text-muted-foreground">
        No preview for {route || "this address"}.
      </p>
    )
  }
  const Main = ownMain.has(route) ? "div" : "main"
  return (
    <Main className="@container flex flex-col">
      <Demo />
    </Main>
  )
}
