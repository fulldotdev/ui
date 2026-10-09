import * as React from "react"

import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Articles1 } from "@/components/blocks/articles-1"
import { Articles2 } from "@/components/blocks/articles-2"
import { Articles3 } from "@/components/blocks/articles-3"
import { Articles4 } from "@/components/blocks/articles-4"

const placeholderImage = placeholder.src

const demos: Record<string, React.ComponentType> = {
  "articles-1": () => {
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
  },
  "articles-2": () => {
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
  },
  "articles-3": () => {
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
  },
  "articles-4": () => {
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
  },
}

export default demos
