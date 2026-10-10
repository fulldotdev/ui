import { Content1 } from "@/components/blocks/content-1"

export default function Content1Demo() {
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
}
