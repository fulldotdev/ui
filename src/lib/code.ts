// Docs only: a token in the code's own colors needs no style of its own; it
// inherits them from the <pre>. On the docs pages that is about half of all
// tokens, so highlighted code takes far less HTML.
import type { ShikiConfig } from "@astrojs/markdown-remark"

type Transformer = NonNullable<ShikiConfig["transformers"]>[number]
type Node = {
  type: string
  tagName?: string
  properties?: Record<string, unknown>
  children?: Node[]
}

// The colors in a style attribute, such as color and --shiki-dark.
const colors = (style: unknown) =>
  Object.fromEntries(
    String(style ?? "")
      .toLowerCase()
      .split(";")
      .map((part) => part.split(":").map((value) => value.trim()))
      .filter(([key, value]) => key && value)
  )

const same = (a: Record<string, string>, b: Record<string, string>) =>
  Object.keys(a).length === Object.keys(b).length &&
  Object.keys(a).every((key) => a[key] === b[key])

export const inheritCodeColors: Transformer = {
  name: "fulldev:inherit-code-colors",
  pre(pre) {
    const root = colors(pre.properties.style)
    const own = Object.fromEntries(
      ["color", "--shiki-dark"]
        .filter((key) => root[key])
        .map((key) => [key, root[key]])
    )
    if (!Object.keys(own).length) return
    const unwrap = (node: Node) => {
      node.children = node.children?.flatMap((child) => {
        const token =
          child.tagName === "span" &&
          !child.properties?.class &&
          !child.properties?.className &&
          same(colors(child.properties?.style), own)
        if (token) return child.children ?? []
        unwrap(child)
        return [child]
      })
    }
    unwrap(pre as Node)
  },
}
