import { z } from "astro:schema"

import { align } from "@/schemas/fields/align"
import { html } from "@/schemas/fields/html"
import { links } from "@/schemas/fields/links"
import { products as productsRef } from "@/schemas/fields/products"
import { size } from "@/schemas/fields/size"
import { variant } from "@/schemas/fields/variant"

export const products = z
  .object({
    variant,
    size,
    align,
    html,
    links,
    products: productsRef,
  })
  .partial()
  .strict()
