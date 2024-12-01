import { z } from 'astro:content'
import icon from 'fulldev-ui/schemas/components/icon.ts'
import text from 'fulldev-ui/schemas/components/text.ts'

export const badgeSchema = z.object({
  icon: icon,
  text: text,
  href: z.string().optional(),
  size: z.enum(['sm', 'md', 'lg']).optional(),
  variant: z.enum(['primary', 'secondary', 'outline', 'ghost']).optional(),
})

export type BadgeSchema = z.infer<typeof badgeSchema>

export default badgeSchema
