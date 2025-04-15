import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface Props extends React.ComponentProps<"div"> {
  percentage?: number
  before?: number
  after?: number
}

function Discount({ className, percentage, before, after, ...props }: Props) {
  console.log({ percentage, before, after })
  return percentage || (before && after) ? (
    <Badge className={cn("discount", className)} {...props}>
      {percentage
        ? `${percentage}%`
        : before && after
          ? `${Math.round(((before - (after || 0)) / before) * 100)}%`
          : null}
    </Badge>
  ) : null
}

export { Discount }
