import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Articles3 } from "@/components/blocks/articles-3"

const placeholderImage = placeholder.src

export default function Articles3Demo() {
  return (
    <>
      <Articles3
        title="All articles"
        articles={[
          {
            image: {
              src: placeholderImage,
              alt: "",
            },
            category: "Docs",
            title: "Designing better release notes",
            description:
              "This row-based listing works well when the article page itself carries most of the visual drama.",
            author: {
              image: placeholderImage,
              initials: "SV",
              name: "Sil Veltman",
              date: "May 5, 2026",
            },
          },
          {
            image: {
              src: placeholderImage,
              alt: "",
            },
            category: "Launch",
            title: "A content system for launch pages",
            description:
              "Horizontal cards give each article equal weight while staying scannable.",
            author: {
              image: placeholderImage,
              initials: "JD",
              name: "Jane Doe",
              date: "Apr 30, 2026",
            },
          },
          {
            image: {
              src: placeholderImage,
              alt: "",
            },
            category: "Guide",
            title: "Working with reusable sections",
            description:
              "Learn how section primitives reduce duplication across editorial layouts.",
            author: {
              image: placeholderImage,
              initials: "MR",
              name: "Mark Reed",
              date: "Apr 22, 2026",
            },
          },
          {
            image: {
              src: placeholderImage,
              alt: "",
            },
            category: "Essay",
            title: "The case for wider editorial layouts",
            description:
              "Why content-first teams are moving away from narrow single-column designs.",
            author: {
              image: placeholderImage,
              initials: "AL",
              name: "Amy Lin",
              date: "Apr 15, 2026",
            },
          },
        ]}
      />
    </>
  )
}
