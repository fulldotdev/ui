import { type PageModel } from "@stackbit/types"
import { descriptionField } from "stackbit/components/description-field"
import { imageField } from "stackbit/components/image-field"
import { sectionsField } from "stackbit/components/sections-field"
import { seoField } from "stackbit/components/seo-field"
import { slugField } from "stackbit/components/slug-field"
import { titleField } from "stackbit/components/title-field"

export const eventModel = {
  name: "event",
  label: "Evenement",
  type: "page",
  urlPath: "/{slug}",
  filePath: `src/content/pages/{slug}.md`,
  fields: [
    slugField,
    titleField,
    descriptionField,
    {
      name: "where",
      label: "Waar",
      type: "text",
    },
    {
      name: "when",
      label: "Wanneer",
      type: "text",
    },
    seoField,
  ],
} satisfies PageModel
