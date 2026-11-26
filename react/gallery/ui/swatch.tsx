import { Swatch } from "@/components/ui/swatch"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export default function Demo() {
  return (
    <div className="flex flex-col gap-10 p-6">
      <ToggleGroup variant="outline" defaultValue={["navy"]} aria-label="Color">
        <ToggleGroupItem value="navy">
          <Swatch color="#1e3a5f" />
          Navy
        </ToggleGroupItem>
        <ToggleGroupItem value="sand">
          <Swatch color="#d8c7a6" />
          Sand
        </ToggleGroupItem>
        <ToggleGroupItem value="white">
          <Swatch color="#ffffff" />
          White
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
