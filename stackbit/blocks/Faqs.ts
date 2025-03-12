import { type ObjectModel } from "@stackbit/types"
import { buttonsField } from "stackbit/components/buttons"
import { descriptionField } from "stackbit/components/description"
import { titleField } from "stackbit/components/title"

export const faqsModel: ObjectModel = {
  name: "faqs",
  type: "object",
  fields: [
    titleField,
    descriptionField,
    buttonsField,
    {
      name: "faqs",
      type: "list",
      items: {
        type: "object",
        fields: [titleField, descriptionField],
      },
    },
  ],
}
