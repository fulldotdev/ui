import { type ObjectModel } from "@stackbit/types"
import { buttonsField } from "stackbit/components/buttons"
import { descriptionField } from "stackbit/components/description"
import { titleField } from "stackbit/components/title"

export const postsModel: ObjectModel = {
  name: "posts",
  type: "object",
  fields: [
    titleField,
    descriptionField,
    buttonsField,
    {
      name: "posts",
      type: "list",
      items: {
        type: "reference",
        models: ["post"],
      },
    },
  ],
}
