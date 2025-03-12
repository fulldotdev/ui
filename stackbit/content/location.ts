import { type PageModel } from "@stackbit/types"
import { descriptionField } from "stackbit/components/description"
import { imageField } from "stackbit/components/image"
import { titleField } from "stackbit/components/title"
import { seoField } from "stackbit/misc/seo"

export const locationModel: PageModel = {
  name: "location",
  type: "page",
  urlPath: "/locaties/{slug}/",
  filePath: "src/content/locations/{slug}.md",
  fields: [titleField, descriptionField, imageField, seoField],
}
