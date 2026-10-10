import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Articles2 } from "@/components/blocks/articles-2"

const placeholderImage = placeholder.src

export default function Articles2Demo() {
  return (
    <>
      <Articles2
        title="Editorial systems for product teams"
        description="A featured essay with supporting notes for teams shaping product launches, documentation, and release narratives."
        featured={{
          image: {
            src: placeholderImage,
            alt: "",
          },
          category: "Strategy",
          title:
            "Designing a launch page that can keep changing after release day",
          description:
            "The strongest launch pages are not frozen announcements. They are living surfaces with room for customer proof, product detail, and follow-up stories as the release matures.",
          author: {
            image: placeholderImage,
            initials: "NR",
            name: "Nora Reed",
            date: "May 1, 2026",
          },
        }}
        articles={[
          {
            image: {
              src: placeholderImage,
              alt: "",
            },
            category: "Planning",
            title: "How to turn release notes into a product story",
            description:
              "Start with the user change, then support it with details that explain timing, tradeoffs, and next steps.",
            author: {
              image: placeholderImage,
              initials: "MC",
              name: "Maya Chen",
              date: "Apr 28, 2026",
            },
          },
          {
            image: {
              src: placeholderImage,
              alt: "",
            },
            category: "Research",
            title: "Using customer language without flattening the message",
            description:
              "Good proof points sound specific. Keep the quote close to the context where the customer actually felt the value.",
            author: {
              image: placeholderImage,
              initials: "TS",
              name: "Theo Singh",
              date: "Apr 21, 2026",
            },
          },
          {
            image: {
              src: placeholderImage,
              alt: "",
            },
            category: "Workflow",
            title: "A weekly editorial rhythm for product teams",
            description:
              "A lightweight cadence helps teams keep docs, changelogs, and campaign pages aligned without a heavy planning ritual.",
            author: {
              image: placeholderImage,
              initials: "AL",
              name: "Ari Lee",
              date: "Apr 14, 2026",
            },
          },
        ]}
      />
    </>
  )
}
