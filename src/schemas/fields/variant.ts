import { z } from "astro:schema"

// Generic variant for blocks with 1-2 variants
export const variant = z.enum(["1", "2"])

// For blocks with 3 variants
export const variant3 = z.enum(["1", "2", "3"])
