import { type ObjectModel } from "@stackbit/types"

import { WriteupField } from "../components/Writeup"

export const IntroModel: ObjectModel = {
  name: "Intro",
  type: "object",
  fields: [WriteupField],
}
