import { type DataModel } from "@stackbit/types"
import { buttonsField } from "stackbit/components/buttons-field"
import { descriptionField } from "stackbit/components/description-field"
import { titleField } from "stackbit/components/title-field"

export const collectionsModel = {
  name: "collections",
  label: "Collecties blok",
  type: "data",
  filePath: `src/content/blocks/{slug}.md`,
  fields: [
    titleField,
    descriptionField,
    {
      name: "items",
      type: "list",
      required: true,
      items: {
        type: "reference",
        models: ["collection"],
      },
    },
  ],
} satisfies DataModel
