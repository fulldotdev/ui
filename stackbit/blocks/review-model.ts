import { type DataModel } from "@stackbit/types"
import { descriptionField } from "stackbit/components/description-field"
import { ratingField } from "stackbit/components/rating-field"
import { titleField } from "stackbit/components/title-field"
import { variantField } from "stackbit/components/variant-field"

export const reviewModel = {
  name: "review",
  type: "data",
  filePath: `src/content/reviews/{title}.yml`,
  fields: [variantField, ratingField, titleField, descriptionField],
} satisfies DataModel
