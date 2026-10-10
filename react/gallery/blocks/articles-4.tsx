import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Articles4 } from "@/components/blocks/articles-4"

const placeholderImage = placeholder.src

export default function Articles4Demo() {
  return (
    <>
      <Articles4
        title="Ideas, process, and practice"
        description="Text-focused article cards for indexes that prioritize readability and category browsing."
        articles={[
          {
            category: "Process",
            title: "Component launch checklist",
            description:
              "A step-by-step guide for shipping new components to production without breaking existing pages.",
            author: {
              image: placeholderImage,
              initials: "SV",
              name: "Sil Veltman",
              date: "May 4, 2026",
            },
          },
          {
            category: "Design",
            title: "Editorial pages that convert",
            description:
              "How to balance storytelling with clear calls to action in content-heavy layouts.",
            author: {
              image: placeholderImage,
              initials: "JD",
              name: "Jane Doe",
              date: "Apr 27, 2026",
            },
          },
          {
            category: "Workflow",
            title: "A calmer design system workflow",
            description:
              "Reduce churn and keep your team focused by treating updates as editorial work.",
            author: {
              image: placeholderImage,
              initials: "MR",
              name: "Mark Reed",
              date: "Apr 20, 2026",
            },
          },
          {
            category: "Opinion",
            title: "When to ship blocks over templates",
            description:
              "Templates lock you in. Blocks give teams the flexibility to compose pages that match their content.",
            author: {
              image: placeholderImage,
              initials: "AL",
              name: "Amy Lin",
              date: "Apr 13, 2026",
            },
          },
          {
            category: "Guide",
            title: "Structuring content for reuse",
            description:
              "How to think about content architecture when building with composable section primitives.",
            author: {
              image: placeholderImage,
              initials: "SV",
              name: "Sil Veltman",
              date: "Apr 6, 2026",
            },
          },
          {
            category: "Launch",
            title: "Source-first development",
            description:
              "Ship components as source files and let teams pull exactly what they need.",
            author: {
              image: placeholderImage,
              initials: "JD",
              name: "Jane Doe",
              date: "Mar 30, 2026",
            },
          },
        ]}
      />
    </>
  )
}
