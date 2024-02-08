import type { ComponentProps } from 'astro/types'
import { Card } from '../components/elements/card'

type Card =
  | ComponentProps<typeof Card>
  | ComponentProps<typeof Card>['reference']

export default async (card: Card, collection?: string): Promise<any> => {
  const slot = await Astro.slots.render('default')
  const hasContent = slot?.trim().length > 0
  if (hasContent) return slot
  return
}
