import { type ObjectModel } from "@stackbit/types"
import config from "fulldev.json"
import { alignField } from "stackbit/components/align-field"
import { buttonsField } from "stackbit/components/buttons-field"
import { descriptionField } from "stackbit/components/description-field"
import { levelField } from "stackbit/components/level-field"
import { titleField } from "stackbit/components/title-field"
import { variantField } from "stackbit/components/variant-field"

export const locationsModel = {
  name: "locations",
  type: "object",
  hidden: !config.models.locations,
  fields: [
    variantField,
    levelField,
    alignField,
    titleField,
    descriptionField,
    buttonsField,
    {
      name: "locations",
      type: "list",
      items: {
        type: "reference",
        models: ["location"],
      },
    },
  ],
} satisfies ObjectModel
