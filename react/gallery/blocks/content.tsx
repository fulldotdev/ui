import * as React from "react"

import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Content1 } from "@/components/blocks/content-1"
import { Content2 } from "@/components/blocks/content-2"
import { Content3 } from "@/components/blocks/content-3"
import { Content4 } from "@/components/blocks/content-4"

const placeholderImage = placeholder.src

const demos: Record<string, React.ComponentType> = {
  "content-1": () => {
    return (
      <>
        <Content1
          title="Build better products with a system designed for clarity"
          description="A stacked content section that pairs editorial copy with a full-width image below. Use it to explain a feature, process, or value proposition with visual support."
          features={[
            "Clear headline with supporting description",
            "Bullet list for quick feature scanning",
            "Action buttons for next steps",
            "Full-width image below the content",
          ]}
          buttons={[
            { label: "Get started", href: "#" },
            { label: "Learn more", href: "#" },
          ]}
        />
      </>
    )
  },
  "content-2": () => {
    return (
      <>
        <Content2
          title="Pair editorial copy with a supporting image"
          description="Use this block when screenshots, diagrams, or photos need to sit beside copy without turning the whole page into a gallery."
          features={[
            "Clear headline and intro with supporting copy",
            "One media surface with rounded treatment",
            "Concise bullet points instead of a heavy card grid",
          ]}
          buttons={[
            { label: "Get started", href: "#" },
            { label: "Learn more", href: "#" },
          ]}
        />
      </>
    )
  },
  "content-3": () => {
    return (
      <>
        <Content3
          title="A full-width media section with a spread header"
          description="This variation uses a spread layout with title and description on the left, action buttons on the right, and a prominent full-width image below."
          buttons={[
            { label: "Get started", href: "#" },
            { label: "Learn more", href: "#" },
          ]}
        />
      </>
    )
  },
  "content-4": () => {
    return (
      <>
        <Content4
          title="See the difference in every detail"
          description="A 1:2 split layout with a smaller text column on the left and a larger image on the right. Use it for feature highlights where the visual should dominate."
          features={[
            "Compact text column with checklist",
            "Larger image area for visual emphasis",
            "Asymmetric grid for visual hierarchy",
          ]}
          buttons={[
            { label: "Get started", href: "#" },
            { label: "Learn more", href: "#" },
          ]}
        />
      </>
    )
  },
}

export default demos
