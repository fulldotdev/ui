import type { AstroGlobal } from 'astro'
import merge from 'deepmerge'

export type Endomorphic<
  Props extends AstroGlobal['props'],
  Name extends string,
  Value extends AstroGlobal['props'][Name] = undefined | null,
> = {
  [Key in Name | `_${Name}`]?:
    | Value
    | (Omit<Props, Name> & {
        [K in Name]: Value | undefined
      })
    | null
    | undefined
}

export const endomorphic = <
  Props extends Endomorphic<
    AstroGlobal['props'],
    Name,
    AstroGlobal['props'][Name]
  >,
  Name extends string,
>(
  props: Props,
  name: Name
) => {
  // @ts-ignore
  const { [name]: value, [`_${name}`]: _value, ...stripped } = props

  // @ts-ignore
  const toObject = (val) =>
    typeof val === 'object' && val !== null && !Array.isArray(val)
      ? val
      : { [name]: val }

  const object = toObject(value)
  const _object = toObject(_value)

  // @ts-ignore
  const merged = merge(stripped, merge(_object, object))

  return merged as Omit<Props, Name | `_${Name}`> &
    Extract<Props[Name], object & { length?: never }>
}
