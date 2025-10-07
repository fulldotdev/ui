import { z } from "astro:schema"

import { align } from "@/schemas/fields/align"
import { html } from "@/schemas/fields/html"
import { jobs as jobsRef } from "@/schemas/fields/jobs"
import { links } from "@/schemas/fields/links"
import { size } from "@/schemas/fields/size"
import { variant } from "@/schemas/fields/variant"

export const jobs = z
  .object({
    variant,
    size,
    align,
    html,
    links,
    jobs: jobsRef,
  })
  .partial()
  .strict()
