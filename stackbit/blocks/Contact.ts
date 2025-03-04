import { type ObjectModel } from "@stackbit/types"

import { WriteupField } from "../components/Writeup"

export const ContactModel: ObjectModel = {
  name: "Contact",
  type: "object",
  fields: [
    WriteupField,
    // channels: linkSchema.array(),
    // socials: z.string().array(),
    // form: z.any(),
  ],
}
