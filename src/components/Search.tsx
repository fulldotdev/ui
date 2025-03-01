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
import type { ComponentProps } from 'react'
import { useState } from 'react'

interface Props {
  className?: string
  variant?: ComponentProps<typeof Button>['variant']
  size?: ComponentProps<typeof Button>['size']
  groups?: {
    heading?: string
    links?: {
      text?: string
      href?: string
    }[]
  }[]
}

export function Search({ groups, variant, size, className }: Props) {
  const [open, setOpen] = useState(false)

  return (
    groups && (
      <>
        <Button
          className={cn('border border-input', className)}
          variant={variant}
          size={size}
          onClick={() => setOpen(true)}
        >
          Zoeken...
          <SearchIcon className="ml-4" />
        </Button>
        <CommandDialog
          open={open}
          onOpenChange={setOpen}
        >
          <CommandInput placeholder="Begin met zoeken..." />
          <CommandList>
            <CommandEmpty>Geen resultaten gevonden.</CommandEmpty>
            {groups?.map(({ heading, links }) => (
              <CommandGroup heading={heading}>
                {links?.map(({ text, href }, index) => (
                  <CommandItem
                    key={index}
                    asChild
                    onSelect={() => href && (window.location.href = href)}
                  >
                    <a
                      key={index}
                      href={href || undefined}
                    >
                      {text}
                    </a>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </CommandDialog>
      </>
    )
  )
}

export default Search
