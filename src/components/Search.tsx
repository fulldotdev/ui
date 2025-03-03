import { Button } from '@/components/ui/button'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { Search as SearchIcon } from 'lucide-react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Link } from './link'

interface Props extends React.ComponentProps<typeof Button> {
  groups?: {
    heading?: string
    links?: {
      text?: string
      href?: string
    }[]
  }[]
}

function Search({ groups, className, ...props }: Props) {
  const [open, setOpen] = useState(false)

  return groups ? (
    <>
      <Button
        className={cn('bg-muted/50 text-sm font-normal text-muted-foreground shadow-none justify-between', className)}
        variant="outline"
        {...props}
        onClick={() => setOpen(true)}
      >
        <span>Zoek door alles...</span>
        <SearchIcon className="ml-4 size-4.5" />
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
      >
        <CommandInput placeholder="Zoek door alles..." />
        <CommandList>
          <CommandEmpty>Geen resultaten gevonden.</CommandEmpty>
          {groups.map(({ heading, links }) => (
            <CommandGroup
              key={uuidv4()}
              heading={heading}
            >
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
          ))}
        </CommandList>
      </CommandDialog>
    </>
  ) : null
}

export { Search }
