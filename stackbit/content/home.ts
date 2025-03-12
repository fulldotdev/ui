import { type PageModel } from "@stackbit/types"
import { descriptionField } from "stackbit/components/description"
import { imageField } from "stackbit/components/image"
import { sectionsField } from "stackbit/components/Sections"
import { titleField } from "stackbit/components/title"
import { seoField } from "stackbit/misc/seo"

export const homeModel: PageModel = {
  name: "home",
  type: "page",
  singleInstance: true,
  urlPath: "/",
  filePath: "src/content/pages/index.md",
  fields: [titleField, descriptionField, imageField, sectionsField, seoField],
}
