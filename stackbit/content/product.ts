import { type PageModel } from "@stackbit/types"
import { descriptionField } from "stackbit/components/description"
import { imageField } from "stackbit/components/image"
import { titleField } from "stackbit/components/title"
import { seoField } from "stackbit/misc/seo"

export const productModel: PageModel = {
  name: "product",
  type: "page",
  urlPath: "/producten/{slug}/",
  filePath: "src/content/products/{slug}.md",
  fields: [titleField, descriptionField, imageField, seoField],
}
