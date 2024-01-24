import fs from 'fs'
import yaml from 'js-yaml'
import path from 'path'

export default (relativePath: string) => {
  try {
    const absolutePath = path.join(__dirname, relativePath)
    const file = fs.readFileSync(absolutePath, 'utf8')
    return yaml.load(file)
  } catch (e) {
    return
  }
}
