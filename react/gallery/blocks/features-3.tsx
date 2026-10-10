import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Features3 } from "@/components/blocks/features-3"

const placeholderImage = placeholder.src

export default function Features3Demo() {
  return (
    <>
      <Features3
        title="Designed for every screen"
        description="Horizontal cards with rich media that tell a visual story alongside the feature copy."
        features={[
          {
            title: "Responsive layouts",
            description:
              "Every section adapts gracefully from mobile to ultrawide without extra configuration.",
            image: { src: placeholderImage, alt: "" },
          },
          {
            title: "Accessible by default",
            description:
              "Semantic markup, keyboard navigation, and screen reader support built into every component.",
            image: { src: placeholderImage, alt: "" },
          },
          {
            title: "Visual consistency",
            description:
              "Shared design tokens keep spacing, color, and typography aligned across all sections.",
            image: { src: placeholderImage, alt: "" },
          },
          {
            title: "Instant previews",
            description:
              "See exactly how blocks look in context with the live preview shell.",
            image: { src: placeholderImage, alt: "" },
          },
        ]}
      />
    </>
  )
}
