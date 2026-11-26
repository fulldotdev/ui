import { Label } from "@/components/ui/label"
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/ui/number-field"

export default function Demo() {
  return (
    <div className="flex flex-col gap-10 p-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="quantity">Quantity</Label>
        <NumberField id="quantity" name="quantity" defaultValue={1} min={1}>
          <NumberFieldDecrement aria-label="Decrease quantity" />
          <NumberFieldInput />
          <NumberFieldIncrement aria-label="Increase quantity" />
        </NumberField>
      </div>
    </div>
  )
}
