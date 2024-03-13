import type { AstroGlobal } from 'astro'
import { htmlElementAttributes } from 'html-element-attributes'

// TODO make type safe
export const splitProps = (props: AstroGlobal['props']) => {
  const parentProps = [
    'as',
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
  const parent: any = {}
  const child: any = {}

  Object.entries(props).forEach(([key, value]) => {
    if (
      parentProps.includes(key) ||
      htmlElementAttributes['*'].includes(key) ||
      htmlElementAttributes[props.as]?.includes(key) ||
      key.startsWith('data-') ||
      key.startsWith('aria-')
    ) {
      parent[key] = value
    } else {
      child[key] = value
    }
  })

  return { parent, child }
}
