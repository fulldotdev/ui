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
