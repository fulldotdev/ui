import { z } from 'astro:content'
import { mapKeys } from 'radash'

export default z.string().refine(
  (value) => {
    const packageLayouts = import.meta.glob('../layouts/**/*.astro')
    const userLayouts = import.meta.glob('/src/layouts/**/*.astro')
    const mapBlockKeys = (blocks: any) =>
      mapKeys(blocks, (key: any) => key.split('/').pop().split('.').shift())
    const mergedLayoutComponents = {
      ...mapBlockKeys(packageLayouts),
      ...mapBlockKeys(userLayouts),
    }
    return mergedLayoutComponents[value] !== undefined
  },
  (value) => ({ message: `component: the layout "${value}" does not exist` })
)
