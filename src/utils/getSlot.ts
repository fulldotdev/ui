import type { AstroGlobal } from 'astro'

export default async (Astro: AstroGlobal): Promise<any> => {
  const slot = await Astro.slots.render('default')
  const hasContent = slot?.trim().length > 0
  if (hasContent) return slot
  return
}
