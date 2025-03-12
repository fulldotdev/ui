import { type PageModel } from "@stackbit/types"
import { descriptionField } from "stackbit/components/description"
import { imageField } from "stackbit/components/image"
import { titleField } from "stackbit/components/title"
import { seoField } from "stackbit/misc/seo"

export const partnerModel: PageModel = {
  name: "partner",
  type: "page",
  urlPath: "/partners/{slug}/",
  filePath: "src/content/partners/{slug}.md",
  fields: [titleField, descriptionField, imageField, seoField],
}
