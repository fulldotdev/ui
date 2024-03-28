import { flatten, unflatten } from 'flat'

export const mergeKeys = (object: any) => {
  const flatMerged = flatten(object, {
    transformKey: (key: any) => key.replace(/_/g, ''),
  })
  return unflatten(flatMerged)
}
