import { type ObjectModel } from "@stackbit/types"
import { buttonsField } from "stackbit/components/buttons"
import { descriptionField } from "stackbit/components/description"
import { titleField } from "stackbit/components/title"

export const productsModel: ObjectModel = {
  name: "products",
  type: "object",
  fields: [
    titleField,
    descriptionField,
    buttonsField,
    {
      name: "products",
      type: "list",
      items: {
        type: "reference",
        models: ["product"],
      },
    },
  ],
}
