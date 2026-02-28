import { cva } from "class-variance-authority"

const navigationMenuTriggerStyle = cva(
  "bg-background hover:bg-muted focus:bg-muted data-open:hover:bg-muted data-open:focus:bg-muted data-open:bg-muted/50 focus-visible:ring-ring/50 data-popup-open:bg-muted/50 data-popup-open:hover:bg-muted group/navigation-menu-trigger inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all outline-none focus-visible:ring-3 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50"
)

export default navigationMenuTriggerStyle
