import js from "@shikijs/langs/javascript"
import nord from "@shikijs/themes/nord"
import { File } from "lucide-react"
import { createHighlighterCoreSync } from "shiki/core"
import { createJavaScriptRegexEngine } from "shiki/engine/javascript"

import { Button } from "@/components/ui/button"

interface Props {
  code: string
}

function Code({ code }: Props) {
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

  return (
    <div className="dark bg-foreground relative flex min-w-0 flex-1 flex-col overflow-hidden rounded-xl text-white">
      <Button className="absolute top-2 right-2" variant="ghost" size="icon">
        <File />
      </Button>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}

export { Code }
