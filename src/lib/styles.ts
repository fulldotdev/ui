// Docs only: render cn-* placeholders in HTML the way an install in that style
// would, so previews match installed components exactly.
import {
  applyMenuColor,
  createStyleMaps,
  hasMenuHook,
  hasPlaceholder,
  replacePlaceholders,
  STYLES,
} from "#styles"

const files = import.meta.glob<string>("/registry/styles/*/style-*.css", {
  query: "?raw",
  import: "default",
  eager: true,
})
const { maps, known } = createStyleMaps(
  (path: string) => files[`/registry/styles/${path}`] ?? ""
)

const styles: string[] = STYLES
const defaultStyle = "vega"

const decode = (value: string) =>
  value
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
const encode = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;")

// Menus render with the default menu color. data-menu-target and
// data-menu-translucent keep what the other menu colors install, so
// src/lib/preset-store.ts can switch to the preset's menu color.
function menuAttributes(classes: string, style: string) {
  const solid = applyMenuColor(classes, "default", maps[style])
  const translucent = applyMenuColor(
    classes,
    "default-translucent",
    maps[style]
  )
  const tokens = classes.split(/\s+/)
  return (
    encode(solid) +
    '"' +
    (tokens.includes("cn-menu-target") ? " data-menu-target" : "") +
    (tokens.includes("cn-menu-translucent")
      ? ` data-menu-translucent="${encode(translucent)}"`
      : "")
  )
}

// The docs site follows the preset's style everywhere, previews included.
// Every class string with placeholders renders in the default style and gets
// data-cn, an index into a table of how that string differs in the other
// styles, and the script below switches them before the first paint and when
// the preset changes (src/lib/preset-store.ts). The table holds the classes
// each style removes and adds, so a page carries its HTML once.
type Entry =
  | Record<string, [removed: string, added: string]>
  | { menu: Record<string, [solid: string, translucent: string]> }

export function applySiteStyle(html: string) {
  const table: Entry[] = []
  const ids = new Map<string, number>()
  const rendered = html.replace(
    /(\sclass=")([^"]*)"/g,
    (match, start: string, value: string) => {
      if (!hasPlaceholder.test(value)) return match
      const source = decode(value)
      const own = start + encodeDefault(source)
      let id = ids.get(source)
      if (id === undefined) {
        const entry = createEntry(source)
        if (!entry) return own
        id = table.length
        ids.set(source, id)
        table.push(entry)
      }
      return `${own} data-cn="${id}"`
    }
  )
  if (!table.length) return rendered
  const data = JSON.stringify(table).replace(/</g, "\\u003c")
  // The last </body>: code samples on the page can contain one too.
  const end = rendered.lastIndexOf("</body>")
  if (end === -1) return rendered
  return (
    rendered.slice(0, end) +
    `<script type="application/json" id="site-styles">${data}</script><script>${siteStyleScript}</script>` +
    rendered.slice(end)
  )
}

// How a class string differs in the other styles, or nothing when every style
// renders it the same. Menus keep both menu colors of each style.
function createEntry(source: string): Entry | undefined {
  const render = (style: string) =>
    replacePlaceholders(source, maps[style], known, style)
  const base = render(defaultStyle)
  if (hasMenuHook(base)) {
    const menu = Object.fromEntries(
      styles.map((style): [string, [string, string]] => {
        const classes = render(style)
        return [
          style,
          [
            applyMenuColor(classes, "default", maps[style]),
            applyMenuColor(classes, "default-translucent", maps[style]),
          ],
        ]
      })
    )
    const same = styles.every(
      (style) =>
        JSON.stringify(menu[style]) === JSON.stringify(menu[defaultStyle])
    )
    return same ? undefined : { menu }
  }
  const tokens = new Set(base.split(" ").filter(Boolean))
  const entry: Record<string, [string, string]> = {}
  for (const style of styles) {
    const next = new Set(render(style).split(" ").filter(Boolean))
    const removed = [...tokens].filter((token) => !next.has(token))
    const added = [...next].filter((token) => !tokens.has(token))
    if (removed.length || added.length)
      entry[style] = [removed.join(" "), added.join(" ")]
  }
  return Object.keys(entry).length ? entry : undefined
}

// The default style's attribute value.
function encodeDefault(source: string) {
  const classes = replacePlaceholders(
    source,
    maps[defaultStyle],
    known,
    defaultStyle
  )
  return hasMenuHook(classes)
    ? menuAttributes(classes, defaultStyle)
    : encode(classes) + '"'
}

// data-cn-style keeps the style an element has, so it can switch again, also
// when a component moves or copies it. Other classes, such as one a component
// adds, stay.
const siteStyleScript = `(() => {
  const table = JSON.parse(document.getElementById("site-styles").textContent)
  let current = "${defaultStyle}"
  const tokens = (value) => (value ? value.split(" ") : [])
  const applyTo = (root) => {
    const translucent = (document.documentElement.dataset.menuColor || "").endsWith("translucent")
    const elements = [...root.querySelectorAll("[data-cn]")]
    if (root.matches?.("[data-cn]")) elements.push(root)
    elements.forEach((element) => {
      const entry = table[element.dataset.cn]
      if (!entry) return
      if (entry.menu) {
        const value = entry.menu[current] || entry.menu.${defaultStyle}
        const dark = element.classList.contains("dark")
        element.dataset.menuSolid = value[0]
        element.dataset.menuTranslucent = value[1]
        element.setAttribute("class", translucent ? value[1] : value[0])
        if (dark) element.classList.add("dark")
        return
      }
      const from = element.dataset.cnStyle || "${defaultStyle}"
      if (from === current) return
      const undo = entry[from]
      if (undo) {
        element.classList.remove(...tokens(undo[1]))
        element.classList.add(...tokens(undo[0]))
      }
      const next = entry[current]
      if (next) {
        element.classList.remove(...tokens(next[0]))
        element.classList.add(...tokens(next[1]))
      }
      if (current === "${defaultStyle}") delete element.dataset.cnStyle
      else element.dataset.cnStyle = current
    })
  }
  window.applySiteStyle = (style) => {
    current = style
    applyTo(document)
  }
  // Content that mounts later, such as an opened Select, follows too.
  new MutationObserver((records) => {
    records.forEach((record) =>
      record.addedNodes.forEach((node) => node.nodeType === 1 && applyTo(node))
    )
  }).observe(document.body, { childList: true, subtree: true })
  try {
    const style = JSON.parse(localStorage.getItem("fulldev-ui-preset") || "null")?.config?.style
    if (style && style !== "${defaultStyle}") window.applySiteStyle(style)
  } catch {}
  delete document.documentElement.dataset.stylePending
})()`
