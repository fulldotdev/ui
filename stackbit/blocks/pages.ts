import { type ObjectModel } from "@stackbit/types"
import { buttonsField } from "stackbit/components/buttons"
import { descriptionField } from "stackbit/components/description"
import { titleField } from "stackbit/components/title"

export const pagesModel: ObjectModel = {
  name: "pages",
  type: "object",
  fields: [
    titleField,
    descriptionField,
    buttonsField,
    {
      name: "pages",
      type: "list",
      items: {
        type: "reference",
        models: ["page"],
      },
    },
  ],
}
