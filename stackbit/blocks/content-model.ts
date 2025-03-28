import { type PageModel } from "@stackbit/types"
import { descriptionField } from "stackbit/components/description-field"
import { sectionsField } from "stackbit/components/sections-field"
import { seoField } from "stackbit/components/seo-field"
import { titleField } from "stackbit/components/title-field"

export const contentModel = {
  name: "content",
  label: "Content",
  type: "page",
  urlPath: "/{slug}",
  filePath: `src/content/pages/{slug}.md`,
  fields: [titleField, descriptionField, sectionsField, seoField],
} satisfies PageModel
