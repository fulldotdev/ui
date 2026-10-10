import { Field, FieldLabel } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"

export function FieldSwitch() {
  return (
    <Field orientation="horizontal" className="w-fit">
      <FieldLabel htmlFor="2fa">Multi-factor authentication</FieldLabel>
      <Switch id="2fa" />
    </Field>
  )
}
