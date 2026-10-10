import * as React from "react"

import { buttonVariants } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"

import registry from "../registry.json"

declare const __STYLE__: string
declare const __GALLERY_ROOT__: string

type Demos = Record<string, React.ComponentType>

// One module per UI family (default export) and per block category (a map
// from block name to demo), loaded when its page opens.
const uiDemos = import.meta.glob<{ default: React.ComponentType }>("./ui/*.tsx")
const blockDemos = import.meta.glob<{ default: Demos }>("./blocks/*.tsx")

const styles = ["vega", "nova", "maia", "lyra", "mira", "luma", "sera", "rhea"]
const ui = registry.items.filter((item) => item.type === "registry:ui")
const blocks = registry.items.filter((item) => item.type === "registry:block")

// Gallery pages are #/ routes; a query after the route belongs to the demo.
// Any other hash is an in-page anchor. Next to an anchor the page is kept in
// ?page=, so a reload, a style switch and Back still show it.
function readRoute(fallback = "") {
  const hash = window.location.hash
  if (hash.startsWith("#/")) return hash.slice(2).split("?")[0]
  const page = new URLSearchParams(window.location.search).get("page")
  return page ?? (hash.length > 1 ? fallback : "")
}

function isAnchor() {
  const hash = window.location.hash
  return hash.length > 1 && !hash.startsWith("#/")
}

// Keep ?page= in the current history entry only while it holds an anchor.
function syncUrl(route: string) {
  const url = new URL(window.location.href)
  if (isAnchor() && route) url.searchParams.set("page", route)
  else url.searchParams.delete("page")
  if (url.href !== window.location.href) {
    window.history.replaceState(window.history.state, "", url)
  }
}

function useRoute() {
  const [route, setRoute] = React.useState(() => readRoute())
  const current = React.useRef(route)
  React.useEffect(() => {
    syncUrl(current.current)
    const onChange = () => {
      const next = readRoute(current.current)
      syncUrl(next)
      if (next === current.current) return
      current.current = next
      setRoute(next)
      // The page's anchor is scrolled to once the page has loaded.
      if (!isAnchor()) window.scrollTo(0, 0)
    }
    window.addEventListener("hashchange", onChange)
    window.addEventListener("popstate", onChange)
    return () => {
      window.removeEventListener("hashchange", onChange)
      window.removeEventListener("popstate", onChange)
    }
  }, [])
  return route
}

function load(route: string): Promise<React.ComponentType | undefined> {
  const [kind, name = ""] = route.split("/")
  if (kind === "ui") {
    const module = uiDemos[`./ui/${name}.tsx`]
    return module ? module().then((m) => m.default) : Promise.resolve(undefined)
  }
  if (kind === "blocks") {
    const category = name.replace(/-\d+$/, "")
    const module = blockDemos[`./blocks/${category}.tsx`]
    return module
      ? module().then((m) => m.default[name])
      : Promise.resolve(undefined)
  }
  return Promise.resolve(undefined)
}

function Page({ route }: { route: string }) {
  const [state, setState] = React.useState<{
    route: string
    Demo?: React.ComponentType
  }>()
  React.useEffect(() => {
    let current = true
    load(route).then((Demo) => {
      if (current) setState({ route, Demo })
    })
    return () => {
      current = false
    }
  }, [route])
  // A page opened with an anchor, by a reload, a style switch or Back,
  // renders after the browser looked for the anchor; scroll to it now.
  React.useEffect(() => {
    if (state?.route !== route || !isAnchor()) return
    const id = decodeURIComponent(window.location.hash.slice(1))
    document.getElementById(id)?.scrollIntoView()
  }, [state, route])
  if (state?.route !== route) return null
  if (!state.Demo) {
    return <p className="p-6 text-sm text-muted-foreground">No demo yet.</p>
  }
  const Demo = state.Demo
  return <Demo />
}

function Nav({ route }: { route: string }) {
  const link = (href: string, label: string) => (
    <li key={href}>
      <a
        href={`#/${href}`}
        aria-current={route === href ? "page" : undefined}
        className="block rounded-md px-2 py-1 text-sm text-muted-foreground hover:text-foreground aria-[current=page]:bg-muted aria-[current=page]:text-foreground"
      >
        {label}
      </a>
    </li>
  )
  return (
    <nav
      aria-label="Gallery"
      className="hidden flex-col gap-6 overflow-y-auto border-e p-4 lg:sticky lg:top-0 lg:flex lg:h-svh"
    >
      <div className="flex flex-col gap-2">
        <h2 className="px-2 text-xs font-medium text-muted-foreground">
          Components ({ui.length})
        </h2>
        <ul>
          {ui.map((item) => link(`ui/${item.name}`, item.title ?? item.name))}
        </ul>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="px-2 text-xs font-medium text-muted-foreground">
          Blocks ({blocks.length})
        </h2>
        <ul>
          {blocks.map((item) =>
            link(`blocks/${item.name}`, item.title ?? item.name)
          )}
        </ul>
      </div>
    </nav>
  )
}

// Below lg the link list would push every page far down, so a picker
// takes its place.
function Picker({ route }: { route: string }) {
  return (
    <label className="flex w-full items-center gap-2 text-sm text-muted-foreground lg:hidden">
      Page
      <select
        className="min-w-0 flex-1 rounded-md border bg-background px-2 py-1 text-foreground"
        value={route}
        onChange={(event) => {
          window.location.hash = `/${event.target.value}`
        }}
      >
        <option value="">Overview</option>
        <optgroup label={`Components (${ui.length})`}>
          {ui.map((item) => (
            <option key={item.name} value={`ui/${item.name}`}>
              {item.title ?? item.name}
            </option>
          ))}
        </optgroup>
        <optgroup label={`Blocks (${blocks.length})`}>
          {blocks.map((item) => (
            <option key={item.name} value={`blocks/${item.name}`}>
              {item.title ?? item.name}
            </option>
          ))}
        </optgroup>
      </select>
    </label>
  )
}

// Demos that render a page's main element themselves.
const ownMain = new Set(["ui/layout", "ui/sidebar", "blocks/sidebar-1"])

export function App() {
  const route = useRoute()
  const Main = ownMain.has(route) ? "div" : "main"
  return (
    <div className="grid min-h-svh lg:grid-cols-[16rem_1fr]">
      <Nav route={route} />
      <div className="flex min-w-0 flex-col">
        <header className="flex flex-wrap items-center gap-2 border-b p-3">
          <a href="#/" className="me-auto text-sm font-semibold">
            Fulldev UI for React
          </a>
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            Style
            <select
              className="rounded-md border bg-background px-2 py-1 text-foreground"
              value={__STYLE__}
              onChange={(event) => {
                const style = event.target.value
                const path = style === "vega" ? "" : `${style}/`
                window.location.href = `${__GALLERY_ROOT__}${path}${window.location.search}${window.location.hash}`
              }}
              disabled={import.meta.env.DEV}
            >
              {styles.map((style) => (
                <option key={style}>{style}</option>
              ))}
            </select>
          </label>
          <ThemeToggle />
          <Picker route={route} />
        </header>
        <Main className="@container flex flex-col">
          {route ? (
            <Page route={route} />
          ) : (
            <div className="flex flex-col gap-4 p-6">
              <h1 className="text-2xl font-semibold">Fulldev UI for React</h1>
              <p className="max-w-prose text-muted-foreground">
                Every component and block of the React registry, in the{" "}
                {__STYLE__} style. Pick one from the list or the page picker.
              </p>
              <a
                href="#/ui/button"
                className={buttonVariants({ variant: "outline" })}
              >
                Start with Button
              </a>
            </div>
          )}
        </Main>
      </div>
    </div>
  )
}
