import { type FieldNumber } from "@stackbit/types"

export const ratingField: FieldNumber = {
  name: "rating",
  type: "number",
  min: 0,
  max: 5,
  default: 5,
  step: 0.5,
  controlType: "slider",
}
