import { type FieldNumber } from "@stackbit/types"

export const levelField: FieldNumber = {
  name: "level",
  label: "Heading level",
  type: "number",
  min: 1,
  max: 3,
  controlType: "slider",
}
