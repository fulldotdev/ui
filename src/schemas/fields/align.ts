import { z } from "astro:schema"

export const align = z.enum(["start", "center", "end"])
