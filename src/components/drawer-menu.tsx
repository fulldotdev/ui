import { Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DrawerContent,
  Drawer as DrawerRoot,
  DrawerTrigger,
} from "@/components/ui/drawer"

interface Props
  extends React.ComponentProps<typeof Button>,
    React.ComponentProps<typeof DrawerTrigger> {
  items?: {
    text?: string
    href?: string
    links?: {
      text?: string
      href?: string
    }[]
  }[]
}

function DrawerMenu({ items, className, ...props }: Props) {
  return items ? (
    <DrawerRoot>
      <DrawerTrigger asChild>
        <Button
          name="menu-button"
          className={cn("", className)}
          variant="ghost"
          size="icon"
          {...props}
        >
          <Menu className="size-5 !w-9" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="flex flex-col gap-3 overflow-auto p-6">
          {items?.map(({ text, href, links }) =>
            text || links ? (
              <div
                className={`flex flex-col gap-3 ${links ? "mt-3" : ""}`}
                key={href}
              >
                <a
                  className="text-foreground text-base font-medium hover:underline"
                  href={href}
                >
                  {text}
                </a>
                {links?.map(({ text, href }) =>
                  text && href ? (
                    <a
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      key={href}
                      href={href}
                    >
                      {text}
                    </a>
                  ) : null
                )}
              </div>
            ) : null
          )}
        </div>
      </DrawerContent>
    </DrawerRoot>
  ) : null
}

export { DrawerMenu }
