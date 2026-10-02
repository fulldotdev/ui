// Docs only: render cn-* placeholders in HTML the way an install in that style
// would, so previews match installed components exactly.
import { createStyleMaps, replacePlaceholders, STYLES } from "#styles"

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

// Replace placeholders in every class attribute.
export function applyStyle(html: string, style: string) {
  return html.replace(
    /(\sclass=")([^"]*\bcn-[^"]*)"/g,
    (_, start: string, value: string) =>
      start +
      encode(replacePlaceholders(decode(value), maps[style], known)) +
      '"'
  )
}
