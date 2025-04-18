import { cn } from "@/lib/utils"

interface Props extends React.ComponentProps<"div"> {
  amount?: number
  currency?: string
  locale?: string
}

function Money({
  className,
  currency = "EUR",
  locale = "nl-NL",
  amount,
  ...props
}: Props) {
  return amount ? (
    <div className={cn("price", className)} {...props}>
      {new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
      }).format(amount)}
    </div>
  ) : null
}

export { Money }
