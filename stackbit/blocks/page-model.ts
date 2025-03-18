import { type PageModel } from "@stackbit/types"
import config from "fulldev.json"
import { descriptionField } from "stackbit/components/description-field"
import { imageField } from "stackbit/components/image-field"
import { sectionsField } from "stackbit/components/sections-field"
import { seoField } from "stackbit/components/seo-field"
import { titleField } from "stackbit/components/title-field"
import { variantField } from "stackbit/components/variant-field"

export const pageModel = {
  name: "page",
  type: "page",
  urlPath: "/{slug}",
  filePath: `src/content/pages/{slug}.md`,
  hidden: !config.models.pages,
  fields: [
    variantField,
    titleField,
    descriptionField,
    imageField,
    sectionsField,
    seoField,
  ],
} satisfies PageModel
