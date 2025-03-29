import { type PageModel } from "@stackbit/types"
import { descriptionField } from "stackbit/components/description-field"
import { imageField } from "stackbit/components/image-field"
import { sectionsField } from "stackbit/components/sections-field"
import { seoField } from "stackbit/components/seo-field"
import { slugField } from "stackbit/components/slug-field"
import { titleField } from "stackbit/components/title-field"

export const locationModel = {
  name: "location",
  label: "Locatie",
  type: "page",
  urlPath: "/{slug}",
  filePath: `src/content/pages/{slug}.md`,
  fields: [
    slugField,
    titleField,
    descriptionField,
    imageField,
    sectionsField,
    seoField,
  ],
} satisfies PageModel
