// Shared by the registry build and the docs site: replace cn-* placeholders
// with a style's Tailwind classes, the same way shadcn/ui does.
import { twMerge } from "cn"
import { createStyleMap } from "shadcn/utils"

export const STYLES = [
  "vega",
  "nova",
  "maia",
  "lyra",
  "mira",
  "luma",
  "sera",
  "rhea",
]

// Placeholders shadcn/ui keeps in installed code as CSS hooks.
export const KEEP = new Set([
  "cn-menu-target",
  "cn-menu-translucent",
  "cn-logical-sides",
  "cn-rtl-flip",
  "cn-font-heading",
])

const DIRECTORIES = ["shadcn", "adapted", "fulldev"]

// read(path) returns the contents of a file in registry/styles.
export function createStyleMaps(read) {
  const maps = Object.fromEntries(
    STYLES.map((style) => [
      style,
      createStyleMap(
        DIRECTORIES.map((dir) => read(`${dir}/style-${style}.css`)).join("\n")
      ),
    ])
  )
  // A placeholder that another style defines is simply empty in this style.
  const known = new Set(Object.values(maps).flatMap(Object.keys))
  return { maps, known }
}

// Classes for one style, such as `style-lyra:ml-4` in shadcn/ui examples.
const variant = new RegExp(`^style-(${STYLES.join("|")}):(.+)$`)
export const hasPlaceholder = new RegExp(
  `\\bcn-[\\w-]+|(?:^|\\s)style-(?:${STYLES.join("|")}):`
)

// Replace the placeholders in a class string with the style's classes, in
// place, then merge. Placeholders come first in component strings, so the
// component's own classes and later classes win conflicts. A class for the
// given style wins over the others, like the style variant in the shadcn/ui
// docs; classes for other styles go.
export function replacePlaceholders(value, styleMap, known, style) {
  const active = []
  const tokens = value
    .split(/\s+/)
    .filter(Boolean)
    .map((token) => {
      const match = token.match(variant)
      if (match) {
        if (match[1] === style) active.push(match[2])
        return ""
      }
      if (KEEP.has(token)) return token
      if (styleMap[token]) return styleMap[token]
      return known.has(token) ? "" : token
    })
  return twMerge([...tokens, ...active].join(" "))
}

// Replace the placeholders in every double-quoted string that contains one.
// Style classes can contain single quotes, so other strings are not supported.
export function transformSource(source, styleMap, known, style) {
  return source.replace(/"([^"\n]*)"/g, (string, value) =>
    hasPlaceholder.test(value)
      ? `"${replacePlaceholders(value, styleMap, known, style)}"`
      : string
  )
}
