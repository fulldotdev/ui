import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Hero3 } from "@/components/blocks/hero-3"

const placeholderImage = placeholder.src

export default function Hero3Demo() {
  return (
    <>
      <Hero3
        title="Ship landing pages in hours, not weeks"
        description="A bold hero with text centered over a full background image. Ideal for launches, events, and product announcements."
        buttons={[
          { label: "Start building", href: "/docs/" },
          { label: "See examples", href: "/blocks/" },
        ]}
        image={{ src: placeholderImage }}
      />
    </>
  )
}
