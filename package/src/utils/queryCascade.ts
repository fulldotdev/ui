import { get } from 'radash'
import type { CollectionCascade } from './getCollectionCascade'
import { transformCasing } from './transformCasing'
import { transformLayouts } from './transformLayouts'
import { transformReferences } from './transformReferences'
import { transformSelfs } from './transformSelfs'

export const queryCascade = (
  cascade: CollectionCascade,
  query: string
): any => {
  let data: any = get(cascade, query)
  console.log('data', data)

  data = transformReferences(data, cascade)
  console.log('reference', data)

  data = transformLayouts(data)
  console.log('layout', data)

  data = transformSelfs(data, cascade)
  console.log('selfs', data)

  data = transformCasing(data)
  console.log('casing', data)

  return data
}
