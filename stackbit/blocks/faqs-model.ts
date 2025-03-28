import { type ObjectModel } from "@stackbit/types"
import { alignField } from "stackbit/components/align-field"
import { buttonsField } from "stackbit/components/buttons-field"
import { descriptionField } from "stackbit/components/description-field"
import { levelField } from "stackbit/components/level-field"
import { titleField } from "stackbit/components/title-field"
import { variantField } from "stackbit/components/variant-field"

export const faqsModel = {
  name: "faqs",
  type: "object",
  fields: [
    variantField,
    levelField,
    alignField,
    titleField,
    descriptionField,
    buttonsField,
    {
      name: "items",
      type: "list",
      items: {
        type: "object",
        fields: [titleField, descriptionField],
      },
    },
  ],
} satisfies ObjectModel
