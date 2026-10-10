import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"

export function SpinnerBadge() {
  return (
    <div className="flex items-center gap-4 [--radius:1.2rem]">
      <Badge>
        <Spinner data-icon="inline-start" />
        Syncing
      </Badge>
      <Badge variant="secondary">
        <Spinner data-icon="inline-start" />
        Updating
      </Badge>
      <Badge variant="outline">
        <Spinner data-icon="inline-start" />
        Processing
      </Badge>
    </div>
  )
}
