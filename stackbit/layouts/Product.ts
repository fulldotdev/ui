import { type PageModel } from "@stackbit/types"

import { DescriptionField } from "../components/Description"
import { ImageField } from "../components/Image"
import { MetaField } from "../components/Meta"
import { TitleField } from "../components/Title"

export const ProductModel: PageModel = {
  name: "Product",
  type: "page",
  readOnly: true,
  urlPath: "/producten/{slug}/",
  filePath: "src/content/products/{slug}.md",
  fields: [TitleField, DescriptionField, ImageField, MetaField],
}
