import { type PageModel } from "@stackbit/types"
import config from "fulldev.json"
import { descriptionField } from "stackbit/components/description-field"
import { imageField } from "stackbit/components/image-field"
import { levelField } from "stackbit/components/level-field"
import { sectionsField } from "stackbit/components/sections-field"
import { seoField } from "stackbit/components/seo-field"
import { titleField } from "stackbit/components/title-field"
import { variantField } from "stackbit/components/variant-field"

export const productModel = {
  name: "product",
  type: "page",
  urlPath: "/{slug}",
  filePath: `src/content/pages/{slug}.md`,
  hidden: !config.models.products,
  fields: [
    variantField,
    levelField,
    titleField,
    descriptionField,
    imageField,
    {
      name: "collections",
      type: "list",
      items: {
        type: "reference",
        models: ["collection"],
      },
    },
    sectionsField,
    seoField,
  ],
} satisfies PageModel
