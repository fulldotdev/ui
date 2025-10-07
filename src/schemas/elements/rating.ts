import { z } from "astro:schema"

export default z.number().min(0).max(5)
