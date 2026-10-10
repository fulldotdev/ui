import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Article1 } from "@/components/blocks/article-1"

const placeholderImage = placeholder.src

export default function Article1Demo() {
  return (
    <>
      <Article1
        title="Designing React pages like a magazine, not a dashboard"
        description="A strong content system needs editorial hierarchy, deliberate whitespace, and room for imagery, quotes, and callouts to breathe."
        author={{
          image: placeholderImage,
          initials: "SV",
          name: "Sil Veltman",
          date: "May 2026 · 8 min read",
        }}
        image={{
          src: placeholderImage,
          alt: "",
        }}
      >
        <p>
          When a block library grows beyond buttons and cards, the next problem
          is rhythm. Article layouts need a predictable reading width, but they
          also need places for context, secondary media, and editor notes.
        </p>
        <p>
          This version keeps the story column focused while moving the
          supporting context into a side card. That makes it useful for essays,
          changelogs, interviews, and longer release notes.
        </p>
        <p>
          Build it with semantic sections, card surfaces, and a small set of
          reusable UI primitives instead of one-off editorial CSS.
        </p>
      </Article1>
    </>
  )
}
