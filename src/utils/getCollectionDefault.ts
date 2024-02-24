import type { AstroGlobal } from 'astro'
import type { CollectionEntry, ContentCollectionKey } from 'astro:content'
import fs from 'fs'
import yaml from 'js-yaml'

export default (
  collection: ContentCollectionKey,
  Astro: AstroGlobal
): CollectionEntry<ContentCollectionKey>['data'] => {
  try {
    const moduleId = Astro.self.moduleId as string
    // TODO find less hacky way by contacting astro team
    const path = moduleId.replace(
      'pages/[...pathname].astro',
      `content/${collection}/_${collection}.md`
    )
    const file = fs.readFileSync(path, 'utf8')
    const regex = /(?<=---)[\s\S]*?(?=---)/
    let data = file.match(regex)?.[0]
    if (!data) data = file
    return yaml.load(data)
  } catch (error) {
    return undefined
  }
}
