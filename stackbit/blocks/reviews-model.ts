import { type ObjectModel } from "@stackbit/types"
import config from "fulldev.json"
import { alignField } from "stackbit/components/align-field"
import { descriptionField } from "stackbit/components/description-field"
import { levelField } from "stackbit/components/level-field"
import { titleField } from "stackbit/components/title-field"
import { variantField } from "stackbit/components/variant-field"

export const reviewsModel = {
  name: "reviews",
  type: "object",
  hidden: !config.models.reviews,
  fields: [
    variantField,
    levelField,
    alignField,
    titleField,
    descriptionField,
    {
      name: "reviews",
      type: "list",
      items: {
        type: "reference",
        models: ["review"],
      },
    },
  ],
} satisfies ObjectModel
