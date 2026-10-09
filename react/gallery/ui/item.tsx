import * as React from "react"
import { BadgeCheckIcon, ChevronRightIcon, InboxIcon } from "lucide-react"

import { placeholderImage } from "@/lib/placeholder-image"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"

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

const people = [
  { name: "Olivia Rose", email: "olivia@example.com", initials: "OR" },
  { name: "Rhea Patel", email: "rhea@example.com", initials: "RP" },
  { name: "Liam Chen", email: "liam@example.com", initials: "LC" },
]

export default function Demo() {
  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Variants">
        <div className="flex w-full max-w-md flex-col gap-4">
          <Item>
            <ItemContent>
              <ItemTitle>Default item</ItemTitle>
              <ItemDescription>
                A transparent row with no border.
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button variant="outline" size="sm">
                Open
              </Button>
            </ItemActions>
          </Item>
          <Item variant="outline">
            <ItemContent>
              <ItemTitle>Outline item</ItemTitle>
              <ItemDescription>
                A bordered row for lists in cards.
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button variant="outline" size="sm">
                Open
              </Button>
            </ItemActions>
          </Item>
          <Item variant="muted">
            <ItemContent>
              <ItemTitle>Muted item</ItemTitle>
              <ItemDescription>
                A filled row for secondary content.
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button variant="outline" size="sm">
                Open
              </Button>
            </ItemActions>
          </Item>
        </div>
      </Example>

      <Example title="Sizes">
        <div className="flex w-full max-w-md flex-col gap-4">
          <Item variant="outline">
            <ItemMedia variant="icon">
              <InboxIcon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Default size</ItemTitle>
            </ItemContent>
          </Item>
          <Item variant="outline" size="sm">
            <ItemMedia variant="icon">
              <InboxIcon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Small size</ItemTitle>
            </ItemContent>
          </Item>
          <Item variant="outline" size="xs">
            <ItemMedia variant="icon">
              <InboxIcon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Extra small size</ItemTitle>
            </ItemContent>
          </Item>
        </div>
      </Example>

      <Example title="Link with media">
        <div className="flex w-full max-w-md flex-col gap-4">
          <Item variant="outline" size="sm" render={<a href="#/ui/item" />}>
            <ItemMedia>
              <BadgeCheckIcon className="size-5" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Your profile has been verified.</ItemTitle>
            </ItemContent>
            <ItemActions>
              <ChevronRightIcon className="size-4" />
            </ItemActions>
          </Item>
          <Item variant="outline" render={<a href="#/ui/item" />}>
            <ItemMedia variant="image">
              <img
                src={placeholderImage.src}
                alt="Album cover"
                className="object-cover"
              />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Evening Sessions</ItemTitle>
              <ItemDescription>12 tracks, 48 minutes</ItemDescription>
            </ItemContent>
          </Item>
        </div>
      </Example>

      <Example title="Group with separators">
        <ItemGroup className="max-w-md">
          {people.map((person, index) => (
            <React.Fragment key={person.email}>
              {index > 0 && <ItemSeparator />}
              <Item>
                <ItemMedia>
                  <Avatar>
                    <AvatarFallback>{person.initials}</AvatarFallback>
                  </Avatar>
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{person.name}</ItemTitle>
                  <ItemDescription>{person.email}</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Button variant="ghost" size="sm">
                    Invite
                  </Button>
                </ItemActions>
              </Item>
            </React.Fragment>
          ))}
        </ItemGroup>
      </Example>

      <Example title="Header and footer">
        <Item variant="outline" className="max-w-sm">
          <ItemHeader>
            <img
              src={placeholderImage.src}
              alt="Model preview"
              className="aspect-video w-full rounded-sm object-cover"
            />
          </ItemHeader>
          <ItemContent>
            <ItemTitle>Starter template</ItemTitle>
            <ItemDescription>
              A small site with a hero, features and a contact form.
            </ItemDescription>
          </ItemContent>
          <ItemFooter>
            <span className="text-sm text-muted-foreground">Updated today</span>
            <Button size="sm">Use template</Button>
          </ItemFooter>
        </Item>
      </Example>
    </div>
  )
}
