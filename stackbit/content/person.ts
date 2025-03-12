import { type PageModel } from "@stackbit/types"
import { descriptionField } from "stackbit/components/description"
import { imageField } from "stackbit/components/image"
import { titleField } from "stackbit/components/title"
import { seoField } from "stackbit/misc/seo"

export const personModel: PageModel = {
  name: "person",
  type: "page",
  urlPath: "/personen/{slug}/",
  filePath: "src/content/persons/{slug}.md",
  fields: [titleField, descriptionField, imageField, seoField],
}
