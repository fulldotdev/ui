import { placeholderImage } from "@/lib/placeholder-image"
import { Blocks1 } from "@/components/blocks/blocks-1"
import { Hero1 } from "@/components/blocks/hero-1"

export default function Blocks1Demo() {
  return (
    <Blocks1
      title="Hero"
      description="Hero sections for launches, product storytelling, editorial pages, and social proof."
      copyButton={{ id: "blocks-1-copy", source: "# Hero blocks" }}
      markdownUrl="https://ui.full.dev/blocks/hero.md"
      previousPage={{ href: "/blocks/header/", title: "Header" }}
      nextPage={{ href: "/blocks/links/", title: "Links" }}
      labels={{
        copyMarkdown: "Copy Markdown",
        openIn: "Open in",
        openInMarkdown: "Open in Markdown",
        openInChatGPT: "Open in ChatGPT",
        openInClaude: "Open in Claude",
        openInCursor: "Open in Cursor",
        assistantPrompt:
          "Read https://ui.full.dev/blocks/hero.md, I want to ask questions about it.",
        pagination: "Blocks pagination",
      }}
    >
      <div data-not-typeset="" className="overflow-hidden rounded-xl border">
        <Hero1
          title="Build pages from reusable content sections"
          description="A hero block rendered inside the blocks page."
          buttons={[{ label: "Browse docs", href: "#/" }]}
          image={{ ...placeholderImage, alt: "" }}
        />
      </div>
    </Blocks1>
  )
}
