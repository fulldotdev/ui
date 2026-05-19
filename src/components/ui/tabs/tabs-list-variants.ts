import { cva, type VariantProps } from "class-variance-authority"

export const tabsListVariants = cva(
  "group/tabs-list text-muted-foreground relative inline-flex w-fit items-center justify-center rounded-lg p-[3px] group-data-horizontal/tabs:h-9 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export type TabsListVariantProps = VariantProps<typeof tabsListVariants>
