import { z } from 'astro:content'
import { mapKeys } from 'radash'

export default z.string().refine(
  (value) => {
    const packageComponents = import.meta.glob('../../**/*.astro')
    const userComponents = import.meta.glob('/src/**/*.astro')
    const mapBlockKeys = (blocks: any) =>
      mapKeys(blocks, (key: any) => key.split('/').pop().split('.').shift())
    const mergedComponents = {
      ...mapBlockKeys(packageComponents),
      ...mapBlockKeys(userComponents),
    }
    return mergedComponents[value] !== undefined
  },
  (value) => ({ message: `component: the component "${value}" does not exist` })
)
