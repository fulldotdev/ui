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

// Replace the placeholders in a class string with the style's classes, in
// place, then merge. Placeholders come first in component strings, so the
// component's own classes and later classes win conflicts.
export function replacePlaceholders(value, styleMap, known) {
  const tokens = value
    .split(/\s+/)
    .filter(Boolean)
    .map((token) => {
      if (KEEP.has(token)) return token
      if (styleMap[token]) return styleMap[token]
      return known.has(token) ? "" : token
    })
  return twMerge(tokens.join(" "))
}
