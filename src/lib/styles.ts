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

export const styles: string[] = STYLES
export const defaultStyle = "vega"

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

// Replace placeholders in every class attribute.
export function applyStyle(html: string, style: string) {
  return html.replace(
    /(\sclass=")([^"]*)"/g,
    (match, start: string, value: string) => {
      if (!hasPlaceholder.test(value)) return match
      const classes = replacePlaceholders(
        decode(value),
        maps[style],
        known,
        style
      )
      return hasMenuHook(classes)
        ? start + menuAttributes(classes, style)
        : start + encode(classes) + '"'
    }
  )
}

// The docs site follows the preset's style everywhere, not only in previews.
// Previews are rendered per style already (style-preview.astro); every other
// class string with placeholders gets data-cn, an index into a table of that
// string in each style, and the script below switches them before the first
// paint and when the preset changes (src/lib/preset-store.ts).
export function applySiteStyle(html: string) {
  const table: Record<string, string | [string, string]>[] = []
  const ids = new Map<string, number>()
  const rendered = html.replace(
    /(\sclass=")([^"]*)"/g,
    (match, start: string, value: string) => {
      if (!hasPlaceholder.test(value)) return match
      const source = decode(value)
      const render = (style: string) => {
        const classes = replacePlaceholders(source, maps[style], known, style)
        return hasMenuHook(classes)
          ? ([
              applyMenuColor(classes, "default", maps[style]),
              applyMenuColor(classes, "default-translucent", maps[style]),
            ] as [string, string])
          : classes
      }
      const variants = Object.fromEntries(
        STYLES.map((style) => [style, render(style)])
      )
      const own = start + encodeDefault(source)
      const same = STYLES.every(
        (style) =>
          JSON.stringify(variants[style]) ===
          JSON.stringify(variants[defaultStyle])
      )
      if (same) return own
      let id = ids.get(source)
      if (id === undefined) {
        id = table.length
        ids.set(source, id)
        table.push(variants)
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

// The default style's attribute value, as applyStyle renders it.
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

const siteStyleScript = `(() => {
  const table = JSON.parse(document.getElementById("site-styles").textContent)
  const apply = (style) => {
    const translucent = (document.documentElement.dataset.menuColor || "").endsWith("translucent")
    document.querySelectorAll("[data-cn]").forEach((element) => {
      const entry = table[element.dataset.cn]
      const value = entry && (entry[style] || entry.${defaultStyle})
      if (!value) return
      if (Array.isArray(value)) {
        const dark = element.classList.contains("dark")
        element.dataset.menuSolid = value[0]
        element.dataset.menuTranslucent = value[1]
        element.className = translucent ? value[1] : value[0]
        if (dark) element.classList.add("dark")
      } else element.className = value
    })
  }
  window.applySiteStyle = apply
  try {
    const style = JSON.parse(localStorage.getItem("fulldev-ui-preset") || "null")?.config?.style
    if (style && style !== "${defaultStyle}") apply(style)
  } catch {}
})()`
