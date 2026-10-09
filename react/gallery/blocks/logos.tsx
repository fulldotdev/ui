import * as React from "react"

import { Logos1 } from "@/components/blocks/logos-1"
import { Logos2 } from "@/components/blocks/logos-2"
import { Logos3 } from "@/components/blocks/logos-3"

const demos: Record<string, React.ComponentType> = {
  "logos-1": () => {
    return (
      <>
        <Logos1
          title="Brands we work with"
          description="Example brand names. Replace them with the brands you work with."
          brands={[
            { name: "Northwind" },
            { name: "Frame" },
            { name: "Studio One" },
            { name: "Pioneer" },
            { name: "Pace" },
          ]}
        />
      </>
    )
  },
  "logos-2": () => {
    return (
      <>
        <Logos2
          title="Brands we work with"
          description="A scrolling logo rail for when you have many partners to show. These names are examples."
          brands={[
            { name: "Atlas" },
            { name: "Cinder" },
            { name: "Orbit" },
            { name: "Aster" },
            { name: "Northwind" },
            { name: "Frame" },
            { name: "Studio One" },
            { name: "Pioneer" },
            { name: "Pace" },
            { name: "Signal" },
            { name: "Meridian" },
            { name: "Halcyon" },
            { name: "Lumen" },
            { name: "Quarry" },
          ]}
          labels={{ play: "Play logos", pause: "Pause logos" }}
        />
      </>
    )
  },
  "logos-3": () => {
    return (
      <>
        <Logos3
          brands={[
            { name: "Verve" },
            { name: "Northwind" },
            { name: "Studio 9" },
            { name: "Pioneer" },
            { name: "Pace" },
          ]}
        />
      </>
    )
  },
}

export default demos
