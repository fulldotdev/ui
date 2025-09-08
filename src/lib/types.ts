import { z } from "astro:content"

import {
  transformBlock,
  transformData,
  transformItem,
  transformPage,
} from "@/lib/transforms"

export type ItemProps = z.infer<typeof transformItem>
export type BlockProps = z.infer<typeof transformBlock>
export type DataProps = z.infer<typeof transformData>
export type PageProps = z.infer<typeof transformPage>
