import { CircleCheck } from "lucide-react"

import { cn } from "@/lib/utils"

interface Props {
  list?: (string | undefined)[]
  className?: string
}

export default function ({ list, className }: Props) {
  if (!list || !list.length) return null
  return (
    <ul className={cn("space-y-4", className)}>
      {list.map((item, i) => {
        if (!item) return null
        return (
          <li className="flex items-start gap-2 text-sm" key={i}>
            <CircleCheck className="mt-0.5 size-4 shrink-0" />
            {item}
          </li>
        )
      })}
    </ul>
  )
}
