import { type PageModel } from "@stackbit/types"
import { descriptionField } from "stackbit/components/description-field"
import { imageField } from "stackbit/components/image-field"
import { seoField } from "stackbit/components/seo-field"
import { slugField } from "stackbit/components/slug-field"
import { titleField } from "stackbit/components/title-field"

export const postModel = {
  name: "post",
  label: "Blog",
  type: "page",
  urlPath: "/{slug}",
  filePath: `src/content/pages/{slug}.md`,
  fields: [slugField, titleField, descriptionField, imageField, seoField],
} satisfies PageModel
