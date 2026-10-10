import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Hero4 } from "@/components/blocks/hero-4"

const placeholderImage = placeholder.src

export default function Hero4Demo() {
  return (
    <>
      <Hero4
        title="Full-screen impact for product launches and events"
        description="A taller version of the background image hero that fills the viewport. Includes a feature checklist for quick scanning."
        features={[
          "Zero-JS components by default",
          "React-first primitives",
          "Dark mode included",
        ]}
        buttons={[
          { label: "Learn more", href: "/docs/" },
          { label: "Contact sales", href: "#" },
        ]}
        image={{ src: placeholderImage }}
      />
    </>
  )
}
