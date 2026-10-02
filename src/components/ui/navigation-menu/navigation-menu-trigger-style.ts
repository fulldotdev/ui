import { cva } from "class-variance-authority"

const navigationMenuTriggerStyle = cva(
  "cn-navigation-menu-trigger group/navigation-menu-trigger data-[state=open]:bg-muted/50 data-[state=open]:hover:bg-muted data-[state=open]:focus:bg-muted inline-flex h-9 w-max items-center justify-center outline-none disabled:pointer-events-none"
)

export default navigationMenuTriggerStyle
