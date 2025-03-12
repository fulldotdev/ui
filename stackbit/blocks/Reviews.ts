import { type ObjectModel } from "@stackbit/types"
import { descriptionField } from "stackbit/components/description"
import { titleField } from "stackbit/components/title"

export const reviewsModel: ObjectModel = {
  name: "reviews",
  type: "object",
  fields: [
    titleField,
    descriptionField,
    {
      name: "reviews",
      type: "list",
      items: {
        type: "object",
        fields: [
          { name: "rating", type: "number" },
          titleField,
          descriptionField,
        ],
      },
    },
  ],
}
