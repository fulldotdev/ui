import { type FieldObject } from "@stackbit/types"

export const seoField: FieldObject = {
  name: "seo",
  label: "SEO",
  description: "Heeft invloed op je vindbaarheid in Google.",
  type: "object",
  fields: [
    {
      name: "title",
      type: "string",
      label: "Titel",
      description: "Probeer 50-60 karakters te gebruiken.",
    },
    {
      name: "description",
      type: "string",
      label: "Beschrijving",
      description: "Probeer max. 160 karakters te gebruiken.",
    },
  ],
}
