import { cva, type VariantProps } from "class-variance-authority"

export const tabsListVariants = cva(
  "cn-tabs-list group/tabs-list relative inline-flex w-fit items-center justify-center text-muted-foreground group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col",
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
