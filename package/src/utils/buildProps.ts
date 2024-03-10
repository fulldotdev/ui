import type { AstroGlobal } from 'astro'
import type { HTMLTag, Polymorphic } from 'astro/types'
import merge from 'deepmerge'

type P = AstroGlobal['props']
type N = keyof AstroGlobal['props']
type T = HTMLTag

// HTML attributes depending on element
export type Html<Name extends N, Tag extends T> = Omit<
  Polymorphic<{ as: Tag }>,
  Name | 'slot'
>

// For design purpose
type Design = {
  compact?: boolean | null
  contrast?: boolean | null
  scheme?: 'light' | 'dark' | null
  color?: 'base' | 'accent' | null
  size?: 'small' | 'medium' | 'large' | null
}

// Apply to each component
type Complete<Props extends P, Name extends N, Tag extends T> = Props &
  Html<Name, Tag> &
  Design

// Complete props without component name
type Stripped<Complete, Name extends N> = Omit<Complete, Name>

// Turn flat base props into dynamic _underscore functionality
type Nested<Complete, Name extends N> = {
  [Key in Name | `_${Name}`]?: Name extends keyof Complete
    ? Complete | Complete[Name] | null
    : Complete | null
}

// Total function to build the props
export type BuildProps<
  Props extends P,
  Name extends N,
  Tag extends T = 'div',
> = Stripped<Complete<Props, Name, Tag>, Name> &
  Nested<Complete<Props, Name, Tag>, Name>

export const buildProps = <
  Props extends BuildProps<AstroGlobal['props'], Name, HTMLTag>,
  Name extends string,
>(
  Astro: { props: Props },
  name: Name
) => {
  const props = Astro.props
  const _key = `_${name}` as `_${Name}`
  const key = name
  const _value = props[_key]
  const value = props[key] || _value

  const isObject = (val: any): boolean =>
    typeof val === 'object' && !Array.isArray(val) && val !== null
  const toObject = (val: any) => (isObject(val) ? val : { [key]: val })

  const _object = toObject(_value)
  const object = toObject(value)
  const mergedObject = merge(_object, object)

  delete props[_key]
  delete props[key]

  const merged = merge(props, mergedObject || {}) as any // FIXME
  merged.class
    ? (merged.class = merged.class += ` ${name}`)
    : (merged.class = name)

  return merged as Omit<Props, Name | `_${Name}`> & {
    [Key in Name]?: Exclude<Props[Name], object & { length?: never }>
  }
}
