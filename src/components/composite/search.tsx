import { Button } from '@/components/ui/button'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import * as React from 'react'

interface Props {
  groups?: {
    heading?: string
    links?: {
      text?: string
      href?: string
    }[]
  }[]
}

export function Search({ groups }: Props) {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
      >
        Typ om te zoeken...
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
      >
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>Geen resultaten gevonden.</CommandEmpty>
          {groups?.map(({ heading, links }) => (
            <CommandGroup heading={heading}>
              {links?.map(({ text, href }, index) => (
                <a
                  href={href || undefined}
                  key={index}
                >
                  <CommandItem>{text}</CommandItem>
                </a>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  )
}
