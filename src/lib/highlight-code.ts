import js from "@shikijs/langs/javascript"
import nord from "@shikijs/themes/nord"
import { createHighlighterCoreSync } from "shiki/core"
import { createJavaScriptRegexEngine } from "shiki/engine/javascript"

export function highlightCode(code: string) {
  const shiki = createHighlighterCoreSync({
    themes: [nord],
    langs: [js],
    engine: createJavaScriptRegexEngine(),
  })

  const html = shiki.codeToHtml(code, {
    lang: "js",
    theme: "nord",
    transformers: [
      {
        code(node) {
          node.properties["data-line-numbers"] = ""
        },
      },
    ],
  })

  return html
}
