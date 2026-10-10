import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Hero5 } from "@/components/blocks/hero-5"

const placeholderImage = placeholder.src

export default function Hero5Demo() {
  return (
    <>
      <Hero5
        title="Everything you need to build with React"
        description="A split hero with a feature checklist, action buttons, and social proof on the left, and a product image on the right."
        features={[
          "Zero-JS components by default",
          "shadcn-compatible installation",
          "React-first primitives",
          "Fully accessible and keyboard-navigable",
        ]}
        buttons={[
          { label: "Get started", href: "/docs/" },
          { label: "Components", href: "/components/" },
        ]}
        socialProof={{
          avatars: [
            { image: placeholderImage, initials: "AM" },
            { image: placeholderImage, initials: "KL" },
            { image: placeholderImage, initials: "SV" },
          ],
          rating: 4.8,
          ratingLabel: "Rated 4.8 out of 5",
          text: "Example: 4.8 from 120 reviews",
        }}
        image={{ src: placeholderImage, alt: "" }}
      />
    </>
  )
}
