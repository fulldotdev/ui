import { Button } from '@/components/ui/button'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Search as SearchIcon } from 'lucide-react'
import * as React from 'react'

interface Props {
  groups?:
    | {
        heading?: string | null
        links?:
          | {
              text?: string | null
              href?: string | null
            }[]
          | null
      }[]
    | null
}

export function Search({ groups }: Props) {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Button
        className="bg-muted/50 hover:bg-muted/70 transition-colors"
        variant="outline"
        onClick={() => setOpen(true)}
      >
        Begin met zoeken...
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
}
