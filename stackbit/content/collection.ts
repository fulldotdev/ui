import { type PageModel } from "@stackbit/types"
import { descriptionField } from "stackbit/components/description"
import { imageField } from "stackbit/components/image"
import { titleField } from "stackbit/components/title"
import { seoField } from "stackbit/misc/seo"

export const collectionModel: PageModel = {
  name: "collection",
  type: "page",
  urlPath: "/collecties/{slug}/",
  filePath: "src/content/collections/{slug}.md",
  fields: [titleField, descriptionField, imageField, seoField],
}
