import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const sides = ["top", "right", "bottom", "left"] as const

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

export default function Demo() {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Edit profile">
        <Sheet>
          <SheetTrigger render={<Button variant="outline" />}>
            Open
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you are done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid flex-1 auto-rows-min gap-6 px-4">
              <div className="grid gap-3">
                <Label htmlFor="sheet-name">Name</Label>
                <Input id="sheet-name" defaultValue="Ada Lovelace" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="sheet-username">Username</Label>
                <Input id="sheet-username" defaultValue="@ada" />
              </div>
            </div>
            <SheetFooter>
              <Button type="submit">Save changes</Button>
              <SheetClose render={<Button variant="outline" />}>
                Close
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </Example>
      <Example title="Sides">
        {sides.map((side) => (
          <Sheet key={side}>
            <SheetTrigger
              render={<Button variant="outline" className="capitalize" />}
            >
              {side}
            </SheetTrigger>
            <SheetContent side={side}>
              <SheetHeader>
                <SheetTitle>Sheet on the {side}</SheetTitle>
                <SheetDescription>
                  Slides in from the {side} edge of the screen.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        ))}
      </Example>
      <Example title="Controlled without close button">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger render={<Button variant="outline" />}>
            Open controlled
          </SheetTrigger>
          <SheetContent showCloseButton={false}>
            <SheetHeader>
              <SheetTitle>Unsaved changes</SheetTitle>
              <SheetDescription>
                This sheet has no close button in the corner. Use the buttons
                below or press Escape.
              </SheetDescription>
            </SheetHeader>
            <SheetFooter>
              <Button onClick={() => setOpen(false)}>Keep editing</Button>
              <SheetClose render={<Button variant="outline" />}>
                Discard
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <p className="text-sm text-muted-foreground">
          {open ? "Sheet is open" : "Sheet is closed"}
        </p>
      </Example>
    </div>
  )
}
