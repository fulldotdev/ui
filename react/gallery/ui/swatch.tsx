import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Swatch } from "@/components/ui/swatch"

const colors = [
  { value: "navy", label: "Navy", color: "#1e3a5f" },
  { value: "sand", label: "Sand", color: "#d8c7a6" },
  { value: "white", label: "White", color: "#ffffff" },
]

export default function Demo() {
  return (
    <div className="flex flex-col gap-10 p-6">
      <FieldSet>
        <FieldLegend variant="label">Color</FieldLegend>
        <FieldGroup className="gap-3">
          {colors.map(({ value, label, color }) => (
            <Field key={value} orientation="horizontal">
              <Checkbox id={`color-${value}`} name="color" value={value} />
              <Label htmlFor={`color-${value}`}>
                <Swatch color={color} />
                {label}
              </Label>
            </Field>
          ))}
        </FieldGroup>
      </FieldSet>
    </div>
  )
}
