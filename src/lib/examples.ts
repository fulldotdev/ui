// Docs only: find the source file behind an <Example name="..." /> on a page.
// - Astro ports of the official shadcn/ui examples in src/components/examples,
//   one folder and registry item (<family>-examples) per component.
// - Astro block demos in src/gallery/blocks, shown at /preview/astro/<name>/.
// - React block and Fulldev extra demos of the preview app in react/gallery.
// The preview, the Code tab, the Markdown version and the install command all
// come from that one file.
import liquidDependencies from "@liquid/examples/dependencies.json"

import type { Framework } from "@/lib/pages"

type Example = {
  name: string
  framework: Framework
  kind: "examples" | "blocks" | "ui"
  // The registry item that installs it.
  item: string
  path: string
  source: string
  lang: "astro" | "tsx" | "liquid"
  // The preview app route, for React.
  route: string
  dependencies?: string[]
}

const astroSources = import.meta.glob<string>(
  ["/src/components/examples/*/*.astro", "/src/gallery/blocks/*.astro"],
  { query: "?raw", import: "default", eager: true }
)
const reactSources = import.meta.glob<string>(
  ["/react/gallery/blocks/*.tsx", "/react/gallery/ui/*.tsx"],
  { query: "?raw", import: "default", eager: true }
)

const pattern =
  /^\/(?:react|src)\/(?:components\/(examples)\/([^/]+)|gallery\/(blocks|ui))\/([^/]+)\.(?:astro|tsx)$/

const examples = [astroSources, reactSources].flatMap((sources) =>
  Object.entries(sources).map(([path, source]): Example => {
    const [, examplesKind, family, demoKind, name] = path.match(pattern) ?? []
    const kind = (examplesKind ?? demoKind) as Example["kind"]
    const framework = path.startsWith("/react/") ? "react" : "astro"
    return {
      name,
      framework,
      kind,
      item: kind === "examples" ? `${family}-examples` : name,
      path: path.slice(1),
      source: source.trimEnd(),
      lang: framework === "react" ? "tsx" : "astro",
      route:
        kind === "examples" ? `examples/${family}/${name}` : `${kind}/${name}`,
    }
  })
)

const liquidSources = import.meta.glob<string>("/liquid/examples/*.liquid", {
  query: "?raw",
  import: "default",
  eager: true,
})
examples.push(
  ...Object.entries(liquidSources).map(([path, source]): Example => {
    const name = path
      .split("/")
      .at(-1)!
      .replace(/\.liquid$/, "")
    return {
      name,
      framework: "liquid",
      kind: "ui",
      item: name,
      path: path.slice(1),
      source: source.trimEnd(),
      lang: "liquid",
      route: name,
      dependencies: liquidDependencies[name as keyof typeof liquidDependencies],
    }
  })
)

export const getExample = (name: string, framework: Framework) =>
  examples.find(
    (example) => example.name === name && example.framework === framework
  )

const exampleTag = /^<Example\s+name="([^"]+)"\s*\/>$/gm

// The Markdown version of a page shows each example's source.
export const inlineExamples = (body: string, framework: Framework) => {
  const items = new Set<string>()
  const text = body.replace(exampleTag, (tag, name: string) => {
    const example = getExample(name, framework)
    if (!example) return tag
    for (const item of example.dependencies ?? [example.item]) items.add(item)
    const title =
      framework === "liquid"
        ? example.path
        : example.kind === "examples"
          ? example.path.replace(/^react\//, "")
          : `Usage of @fulldev/${example.item} (${example.path}, not installed)`
    return `\`\`\`${example.lang} title="${title}"\n${example.source}\n\`\`\``
  })
  return { text, items: [...items] }
}
