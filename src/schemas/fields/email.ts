import { z } from "astro:schema"

export const email = z.string().email()
