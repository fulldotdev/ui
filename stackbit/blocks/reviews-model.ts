import { type DataModel } from "@stackbit/types"
import { descriptionField } from "stackbit/components/description-field"
import { ratingField } from "stackbit/components/rating-field"
import { titleField } from "stackbit/components/title-field"

export const reviewsModel = {
  name: "reviews",
  type: "data",
  filePath: `src/content/blocks/{slug}.md`,
  fields: [
    titleField,
    descriptionField,
    {
      name: "items",
      type: "list",
      items: {
        type: "object",
        fields: [ratingField, titleField, descriptionField],
      },
    },
  ],
} satisfies DataModel
