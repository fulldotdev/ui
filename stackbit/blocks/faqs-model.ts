import { type DataModel } from "@stackbit/types"
import { buttonsField } from "stackbit/components/buttons-field"
import { descriptionField } from "stackbit/components/description-field"
import { titleField } from "stackbit/components/title-field"

export const faqsModel = {
  name: "faqs",
  label: "FAQ's blok",
  type: "data",
  filePath: `src/content/blocks/{slug}.md`,
  fields: [
    titleField,
    descriptionField,
    buttonsField,
    {
      name: "items",
      type: "list",
      required: true,
      items: {
        type: "object",
        fields: [titleField, descriptionField],
      },
    },
  ],
} satisfies DataModel
