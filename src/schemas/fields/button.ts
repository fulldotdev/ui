import { z } from 'astro:content'

export const buttonSchema = z
  .object({
    text: z.string().nullish(),
    href: z.string().nullish(),
    icon: z.string().nullish(),
    variant: z
      .enum(['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'])
      .nullish(),
    size: z.enum(['default', 'sm', 'lg']).nullish(),
  })
  .strict()

export type ButtonSchema = z.infer<typeof buttonSchema>
