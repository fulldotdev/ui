import config from "@/data/config.json"
import { type ObjectModel } from "@stackbit/types"
import { alignField } from "stackbit/components/align-field"
import { descriptionField } from "stackbit/components/description-field"
import { levelField } from "stackbit/components/level-field"
import { titleField } from "stackbit/components/title-field"
import { variantField } from "stackbit/components/variant-field"

export const reviewsModel = {
  name: "reviews",
  type: "object",
  fields: [
    variantField,
    levelField,
    alignField,
    titleField,
    descriptionField,
    {
      name: "items",
      type: "list",
      items: {
        type: "reference",
        models: ["review"],
      },
    },
  ],
} satisfies ObjectModel
