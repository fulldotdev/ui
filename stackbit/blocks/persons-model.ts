import { type DataModel } from "@stackbit/types"
import { descriptionField } from "stackbit/components/description-field"
import { titleField } from "stackbit/components/title-field"

export const personsModel = {
  name: "persons",
  label: "Personen blok",
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
        models: ["person"],
      },
    },
  ],
} satisfies DataModel
