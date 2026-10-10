import { Logos2 } from "@/components/blocks/logos-2"

export default function Logos2Demo() {
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
}
