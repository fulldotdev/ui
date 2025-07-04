import type { transformBlock, transformEntry } from "@/lib/transform"

export type EntryProps = Awaited<ReturnType<typeof transformEntry>>
export type BlockProps = Awaited<ReturnType<typeof transformBlock>>
