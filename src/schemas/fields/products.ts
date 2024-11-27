import { reference, z } from 'astro:content'

export const productsSchema = reference('products').array().optional()

export type ProductReferences = z.infer<typeof productsSchema>
