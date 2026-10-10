import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Hero1 } from "@/components/blocks/hero-1"

const placeholderImage = placeholder.src

export default function Hero1Demo() {
  return (
    <>
      <Hero1
        title="Build React pages from reusable content sections"
        description="Production-ready hero blocks, feature grids, and pricing layouts that drop into any React project."
        badge={{ label: "New in v0.9", href: "/docs/" }}
        buttons={[
          { label: "Browse docs", href: "/docs/" },
          { label: "See components", href: "/components/" },
        ]}
        image={{ src: placeholderImage, alt: "" }}
      />
    </>
  )
}
