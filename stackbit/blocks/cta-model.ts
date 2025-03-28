import { type DataModel } from "@stackbit/types"
import { buttonsField } from "stackbit/components/buttons-field"
import { descriptionField } from "stackbit/components/description-field"
import { titleField } from "stackbit/components/title-field"

export const ctaModel = {
  name: "cta",
  label: "CTA blok",
  type: "data",
  filePath: `src/content/blocks/{slug}.md`,
  fields: [titleField, descriptionField, buttonsField],
} satisfies DataModel
