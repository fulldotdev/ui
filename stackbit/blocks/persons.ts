import { type ObjectModel } from "@stackbit/types"
import { buttonsField } from "stackbit/components/buttons"
import { descriptionField } from "stackbit/components/description"
import { titleField } from "stackbit/components/title"

export const personsModel: ObjectModel = {
  name: "persons",
  type: "object",
  fields: [
    titleField,
    descriptionField,
    buttonsField,
    {
      name: "persons",
      type: "list",
      items: {
        type: "reference",
        models: ["person"],
      },
    },
  ],
}
