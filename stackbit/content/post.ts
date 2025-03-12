import { type PageModel } from "@stackbit/types"
import { descriptionField } from "stackbit/components/description"
import { imageField } from "stackbit/components/image"
import { titleField } from "stackbit/components/title"
import { seoField } from "stackbit/misc/seo"

export const postModel: PageModel = {
  name: "post",
  type: "page",
  urlPath: "/blog/{slug}/",
  filePath: "src/content/posts/{slug}.md",
  fields: [titleField, descriptionField, imageField, seoField],
}
