import type { AstroGlobal } from 'astro'

export const getSlot = async (
  Astro: AstroGlobal,
  name: string = 'default'
): Promise<string | undefined> => {
  const slot = await Astro.slots.render(name)
  const hasContent = slot?.trim().length > 0
  if (hasContent) return slot
  return
}
