import { type ObjectModel } from "@stackbit/types"
import { buttonsField } from "stackbit/components/buttons"
import { descriptionField } from "stackbit/components/description"
import { titleField } from "stackbit/components/title"

export const ctaModel: ObjectModel = {
  name: "cta",
  type: "object",
  fields: [titleField, descriptionField, buttonsField],
}
