import { useState } from "react"
import { Search as SearchIcon } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

import { Link } from "./link"

interface Props extends React.ComponentProps<typeof Button> {
  links?: {
    text?: string
    href?: string
  }[]
}

function Search({ links, className, ...props }: Props) {
  const [open, setOpen] = useState(false)

  return links ? (
    <>
      <Button
        className={cn(
          "bg-muted/50 text-muted-foreground justify-between text-sm font-normal shadow-none",
          className
        )}
        variant="outline"
        {...props}
        onClick={() => setOpen(true)}
      >
        <span>Zoek door alles...</span>
        <SearchIcon className="ml-4 size-4.5" />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Zoek door alles..." />
        <CommandList>
          <CommandEmpty>Geen resultaten gevonden.</CommandEmpty>
          <CommandGroup>
            {links?.map(({ text, href }) =>
              text && href ? (
                <CommandItem
                  key={uuidv4()}
                  asChild
                  onSelect={() => href && (window.location.href = href)}
                >
                  <Link href={href}>{text}</Link>
                </CommandItem>
              ) : null
            )}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  ) : null
}

export { Search }
