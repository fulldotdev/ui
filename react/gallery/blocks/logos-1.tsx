import { Logos1 } from "@/components/blocks/logos-1"

export default function Logos1Demo() {
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
}
