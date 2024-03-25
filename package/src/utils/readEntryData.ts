// import { type CollectionEntry, type CollectionKey } from 'astro:content'
// import fs from 'fs/promises' // Use fs promises for async operations
// import yaml from 'js-yaml'
// import path from 'path'

// type EntryData = Partial<CollectionEntry<CollectionKey>['data']>

// export const readEntryData = async (
//   collection: CollectionKey,
//   id: string
// ): Promise<EntryData> => {
//   try {
//     const filepath = path.join(process.cwd(), `src/content/${collection}/${id}`)
//     let file = await fs.readFile(`${filepath}`, 'utf8')

//     const isMarkdown = id.endsWith('.md')
//     const regex = /(?<=---)[\s\S]*?(?=---)/
//     const yamlString = isMarkdown ? file.match(regex)?.[0] : file

//     return yaml.load(yamlString || '') || ({} as EntryData)
//   } catch (error) {
//     return {}
//   }
// }
