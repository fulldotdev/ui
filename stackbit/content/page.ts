import { type PageModel } from "@stackbit/types"
import { descriptionField } from "stackbit/components/description"
import { imageField } from "stackbit/components/image"
import { sectionsField } from "stackbit/components/Sections"
import { titleField } from "stackbit/components/title"
import { seoField } from "stackbit/misc/seo"

export const pageModel: PageModel = {
  name: "page",
  type: "page",
  urlPath: "/{slug}/",
  filePath: "src/content/pages/{slug}.md",
  fields: [titleField, descriptionField, imageField, sectionsField, seoField],
}
