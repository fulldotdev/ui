import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function LabelDemo() {
  return (
    <div className="flex gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  )
}
