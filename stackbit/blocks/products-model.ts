import { type DataModel } from "@stackbit/types"
import { buttonsField } from "stackbit/components/buttons-field"
import { descriptionField } from "stackbit/components/description-field"
import { titleField } from "stackbit/components/title-field"

export const productsModel = {
  name: "products",
  type: "data",
  filePath: `src/content/blocks/{slug}.md`,
  fields: [
    titleField,
    descriptionField,
    buttonsField,
    {
      name: "items",
      type: "list",
      items: {
        type: "reference",
        models: ["product"],
      },
    },
  ],
} satisfies DataModel
