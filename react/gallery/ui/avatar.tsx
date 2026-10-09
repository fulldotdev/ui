import * as React from "react"
import { CheckIcon, PlusIcon } from "lucide-react"

import { placeholderImage } from "@/lib/placeholder-image"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"

function Example({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
      <div className="flex flex-wrap items-start gap-4">{children}</div>
    </section>
  )
}

const team = [
  { name: "Sara Visser", initials: "SV" },
  { name: "Jan de Vries", initials: "JV" },
  { name: "Mila Kok", initials: "MK" },
]

export default function Demo() {
  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Image and fallback">
        <Avatar>
          <AvatarImage src={placeholderImage.src} alt="Sara Visser" />
          <AvatarFallback>SV</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="data:image/png;base64,broken" alt="Jan de Vries" />
          <AvatarFallback>JV</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>MK</AvatarFallback>
        </Avatar>
      </Example>
      <Example title="Sizes">
        <div className="flex items-center gap-4">
          <Avatar size="sm">
            <AvatarImage src={placeholderImage.src} alt="Small avatar" />
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src={placeholderImage.src} alt="Default avatar" />
            <AvatarFallback>DF</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarImage src={placeholderImage.src} alt="Large avatar" />
            <AvatarFallback>LG</AvatarFallback>
          </Avatar>
        </div>
      </Example>
      <Example title="With badge">
        <div className="flex items-center gap-4">
          <Avatar size="sm">
            <AvatarFallback>SV</AvatarFallback>
            <AvatarBadge className="bg-green-600 dark:bg-green-800" />
          </Avatar>
          <Avatar>
            <AvatarImage src={placeholderImage.src} alt="Jan de Vries" />
            <AvatarFallback>JV</AvatarFallback>
            <AvatarBadge className="bg-green-600 dark:bg-green-800">
              <CheckIcon />
            </AvatarBadge>
          </Avatar>
          <Avatar size="lg">
            <AvatarImage src={placeholderImage.src} alt="Mila Kok" />
            <AvatarFallback>MK</AvatarFallback>
            <AvatarBadge>
              <PlusIcon />
            </AvatarBadge>
          </Avatar>
        </div>
      </Example>
      <Example title="Group with count">
        <AvatarGroup>
          {team.map((person) => (
            <Avatar key={person.initials}>
              <AvatarImage src={placeholderImage.src} alt={person.name} />
              <AvatarFallback>{person.initials}</AvatarFallback>
            </Avatar>
          ))}
          <AvatarGroupCount>+4</AvatarGroupCount>
        </AvatarGroup>
        <AvatarGroup>
          {team.map((person) => (
            <Avatar key={person.initials} size="sm">
              <AvatarFallback>{person.initials}</AvatarFallback>
            </Avatar>
          ))}
          <AvatarGroupCount>
            <PlusIcon />
            <span className="sr-only">Add a team member</span>
          </AvatarGroupCount>
        </AvatarGroup>
      </Example>
    </div>
  )
}
