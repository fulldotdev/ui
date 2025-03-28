import { type DataModel } from "@stackbit/types"
import { buttonsField } from "stackbit/components/buttons-field"
import { descriptionField } from "stackbit/components/description-field"
import { imageField } from "stackbit/components/image-field"
import { titleField } from "stackbit/components/title-field"

export const heroModel = {
  name: "hero",
  label: "Hero blok",
  type: "data",
  filePath: `src/content/blocks/{slug}.md`,
  fields: [titleField, descriptionField, buttonsField, imageField],
} satisfies DataModel
