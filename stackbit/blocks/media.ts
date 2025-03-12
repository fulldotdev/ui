import { type ObjectModel } from "@stackbit/types"
import { buttonsField } from "stackbit/components/buttons"
import { descriptionField } from "stackbit/components/description"
import { imageField } from "stackbit/components/image"
import { titleField } from "stackbit/components/title"

export const mediaModel: ObjectModel = {
  name: "media",
  type: "object",
  fields: [titleField, descriptionField, buttonsField, imageField],
}
