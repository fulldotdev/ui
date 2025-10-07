import { z } from "astro:schema"

export const persons = z.string().array()
