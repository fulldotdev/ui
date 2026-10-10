import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Hero12 } from "@/components/blocks/hero-12"

const placeholderImage = placeholder.src

export default function Hero12Demo() {
  return (
    <>
      <Hero12
        title="A minimal editorial hero with a border bar and full-width image"
        description="Title, description, and actions spread across a bordered bar, followed by a large image below."
        buttons={[{ label: "Read the story", href: "#" }]}
        image={{ src: placeholderImage, alt: "" }}
      />
    </>
  )
}
