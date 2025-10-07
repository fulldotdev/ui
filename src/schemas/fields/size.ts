import { z } from "astro:schema"

export const size = z.enum(["sm", "default", "lg"])
