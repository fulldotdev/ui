import type { AstroGlobal } from 'astro'
import { htmlElementAttributes } from 'html-element-attributes'

const tagProps = [
  'as',
  'always',
  'child',
  'component',
  'align',
  'layout',
  'color',
  'scheme',
  'size',
  'look',
  'order',
  'frame',
  'compact',
  'contrast',
]

export const getChildProps = (
  props: AstroGlobal['props']
): Partial<typeof props> => {
  const allAttributes = Object.values(htmlElementAttributes).flat()
  const filtered = Object.fromEntries(
    Object.entries(props).filter(
      ([key]) =>
        (!allAttributes.includes(key) &&
          !tagProps.includes(key) &&
          !key.startsWith('data-') &&
          !key.startsWith('aria-')) ||
        key === 'title'
    )
  )
  return filtered
}
