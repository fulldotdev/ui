import { type ObjectModel } from "@stackbit/types"
import config from "fulldev.json"
import { alignField } from "stackbit/components/align-field"
import { buttonsField } from "stackbit/components/buttons-field"
import { descriptionField } from "stackbit/components/description-field"
import { levelField } from "stackbit/components/level-field"
import { titleField } from "stackbit/components/title-field"
import { variantField } from "stackbit/components/variant-field"

export const personsModel = {
  name: "persons",
  type: "object",
  hidden: !config.models.persons,
  fields: [
    variantField,
    levelField,
    alignField,
    titleField,
    descriptionField,
    buttonsField,
    {
      name: "persons",
      type: "list",
      items: {
        type: "reference",
        models: ["person"],
      },
    },
  ],
} satisfies ObjectModel
