import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Articles1 } from "@/components/blocks/articles-1"

const placeholderImage = placeholder.src

export default function Articles1Demo() {
  return (
    <>
      <Articles1
        title="Stories, guides, and ideas from the team"
        description="Lead with one high-importance story, then let the rest of the catalog fall into a compact companion grid."
        articles={[
          {
            image: {
              src: placeholderImage,
              alt: "",
            },
            category: "Guide",
            title: "React patterns for editorial homepages",
            description:
              "Compact companion cards keep the secondary feed useful without competing with the lead story.",
            author: {
              image: placeholderImage,
              initials: "SV",
              name: "Sil Veltman",
              date: "May 3, 2026",
            },
          },
          {
            image: {
              src: placeholderImage,
              alt: "",
            },
            category: "Essay",
            title: "Why section primitives scale better than page templates",
            description:
              "A composable section system reduces boilerplate and keeps editorial pages feeling fresh.",
            author: {
              image: placeholderImage,
              initials: "JD",
              name: "Jane Doe",
              date: "Apr 28, 2026",
            },
          },
          {
            image: {
              src: placeholderImage,
              alt: "",
            },
            category: "Launch",
            title: "Shipping a registry with real previews",
            description:
              "Live previews make it easier for teams to evaluate blocks before installing them.",
            author: {
              image: placeholderImage,
              initials: "MR",
              name: "Mark Reed",
              date: "Apr 21, 2026",
            },
          },
        ]}
      />
    </>
  )
}
