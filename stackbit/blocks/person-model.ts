import { type PageModel } from "@stackbit/types"
import { imageField } from "stackbit/components/image-field"
import { seoField } from "stackbit/components/seo-field"
import { slugField } from "stackbit/components/slug-field"
import { socialsField } from "stackbit/components/socials-field"
import { buttonsField } from "stackbit/components/buttons-field"
import { taglineField } from "stackbit/components/tagline-field"
import { titleField } from "stackbit/components/title-field"

export const personModel = {
  name: "person",
  label: "Persoon",
  type: "page",
  urlPath: "/{slug}",
  filePath: `src/content/pages/{slug}.md`,
  fields: [
    slugField,
    imageField,
    titleField,
    taglineField,
    socialsField,
    buttonsField,
    seoField,
  ],
} satisfies PageModel
