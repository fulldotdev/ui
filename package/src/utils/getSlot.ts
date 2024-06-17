import type { AstroGlobal } from 'astro'

export const getSlot = async (astro: AstroGlobal) => {
  const slot = await astro.slots.render('default')
  const trimmed = typeof slot === 'string' && slot?.trim().length > 0
  return trimmed ? slot : null
}
