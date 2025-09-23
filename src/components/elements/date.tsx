import { CalendarIcon } from "lucide-react"

interface Props {
  size?: "sm" | "default" | "lg"
  date?: Date
}

export default function ({ size, date }: Props) {
  if (!date) return null
  return (
    <p className="inline-flex items-center gap-2 text-sm font-medium">
      <CalendarIcon className="size-4" />
      {new Date(date).toLocaleDateString("nl-NL")}
    </p>
  )
}
