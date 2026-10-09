import * as React from "react"

import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Banner1 } from "@/components/blocks/banner-1"
import { Banner2 } from "@/components/blocks/banner-2"

const placeholderImage = placeholder.src

const demos: Record<string, React.ComponentType> = {
  "banner-1": () => {
    return (
      <>
        <Banner1
          title="New block previews are live"
          description="Browse wider, content-first layouts that mirror real sections instead of isolated UI primitives."
          link={{ label: "Learn more", href: "#" }}
          closeLabel="Close"
          storageKey="banner-1"
        />
      </>
    )
  },
  "banner-2": () => {
    return (
      <>
        <Banner2
          title="Launching v0.9"
          description="Floating banners work well for launch moments, limited promos, and product announcements."
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
