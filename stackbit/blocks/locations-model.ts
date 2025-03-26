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
      type: "reference",
      items: {
        type: "object",
        fields: [],
      },
    },
  ],
} satisfies ObjectModel

banner = block
collection = block
collections = block
cta = block
faqs = block
features = block
hero = block
header = block
footer = block
features = block
posts = page
pricing = block
product = block
review = block
shop = block

// ALLES als page met live preview
