import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Article2 } from "@/components/blocks/article-2"

const placeholderImage = placeholder.src

export default function Article2Demo() {
  return (
    <>
      <Article2
        title="How teams turn component libraries into publishable page systems"
        description="This variant starts centered with metadata inline, which works well for longer interview or analysis pages."
        author={{
          image: placeholderImage,
          initials: "SV",
          name: "Sil Veltman",
          date: "May 3, 2026",
          readingTime: "6 min read",
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
      </Article2>
    </>
  )
}
