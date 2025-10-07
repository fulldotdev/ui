import { z } from "astro:schema"

import { align } from "@/schemas/fields/align"
import { description } from "@/schemas/fields/description"
import { image } from "@/schemas/fields/image"
import { person } from "@/schemas/fields/person"
import { published } from "@/schemas/fields/published"
import { size } from "@/schemas/fields/size"
import { title } from "@/schemas/fields/title"

export default z
  .object({
    align,
    size,
    title,
    description,
    image,
    published,
    person,
  })
  .partial()
  .strict()
