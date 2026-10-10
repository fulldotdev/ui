import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Hero6 } from "@/components/blocks/hero-6"

const placeholderImage = placeholder.src

export default function Hero6Demo() {
  return (
    <>
      <Hero6
        title="The component library built for React"
        description="Split layout with features, social proof, and a side-by-side image. Works for product pages and SaaS landing pages."
        features={[
          "Ship pages faster with blocks",
          "Consistent design system tokens",
          "Dark mode included",
        ]}
        buttons={[
          { label: "Browse blocks", href: "/blocks/" },
          { label: "Documentation", href: "/docs/" },
        ]}
        socialProof={{
          avatars: [
            { image: placeholderImage, initials: "FD" },
            { image: placeholderImage, initials: "AV" },
            { image: placeholderImage, initials: "UI" },
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
