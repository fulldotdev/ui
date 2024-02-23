import type { ContentCollectionKey } from 'astro:content'
import fs from 'fs'
import yaml from 'js-yaml'
import path from 'path'
import { fileURLToPath } from 'url'

export default (collection: ContentCollectionKey) => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const relativePath = `../content/${collection}/_${collection}.md`
  const absolutePath = path.join(__dirname, relativePath)
  const file = fs.readFileSync(absolutePath, 'utf8')
  const regex = /(?<=---)[\s\S]*?(?=---)/
  let data = file.match(regex)?.[0]
  if (!data) data = file
  return yaml.load(data)
}
