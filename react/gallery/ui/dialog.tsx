import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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

const paragraphs = [
  "These terms describe how you may use the service and what we expect from every account holder.",
  "We store the data you upload only to provide the service, and we never sell it to third parties.",
  "You can cancel your subscription at any time from the billing page. Access continues until the end of the period.",
  "We may update these terms. When we do, we notify you by email at least thirty days in advance.",
]

export default function Demo() {
  const [open, setOpen] = React.useState(false)
  const [name, setName] = React.useState("Pedro Duarte")

  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="With form">
        <Dialog>
          <DialogTrigger render={<Button variant="outline" />}>
            Edit profile
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <form
              className="flex flex-col gap-4"
              onSubmit={(event) => event.preventDefault()}
            >
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Save when you are done.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-2">
                <Label htmlFor="dialog-name">Name</Label>
                <Input id="dialog-name" defaultValue="Pedro Duarte" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="dialog-username">Username</Label>
                <Input id="dialog-username" defaultValue="@peduarte" />
              </div>
              <DialogFooter>
                <DialogClose render={<Button variant="outline" />}>
                  Cancel
                </DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </Example>
      <Example title="Controlled">
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            className="w-fit"
            onClick={() => setOpen(true)}
          >
            Rename {name}
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>Rename</DialogTitle>
                <DialogDescription>
                  The new name shows on the button after you close.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-2">
                <Label htmlFor="dialog-rename">Name</Label>
                <Input
                  id="dialog-rename"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <DialogFooter>
                <Button onClick={() => setOpen(false)}>Done</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </Example>
      <Example title="Footer close button and no corner close">
        <Dialog>
          <DialogTrigger render={<Button variant="outline" />}>
            Share link
          </DialogTrigger>
          <DialogContent showCloseButton={false} className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share link</DialogTitle>
              <DialogDescription>
                Anyone who has this link can view the document.
              </DialogDescription>
            </DialogHeader>
            <Input
              aria-label="Link"
              readOnly
              defaultValue="https://example.com/docs/4189"
            />
            <DialogFooter showCloseButton />
          </DialogContent>
        </Dialog>
      </Example>
      <Example title="Scrollable content">
        <Dialog>
          <DialogTrigger render={<Button variant="outline" />}>
            Terms of service
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Terms of service</DialogTitle>
              <DialogDescription>
                Please read before you continue.
              </DialogDescription>
            </DialogHeader>
            <div className="-mx-4 max-h-[50vh] overflow-y-auto px-4 text-sm">
              {Array.from({ length: 12 }).map((_, index) => (
                <p key={index} className="mb-4 leading-normal">
                  {paragraphs[index % paragraphs.length]}
                </p>
              ))}
            </div>
            <DialogFooter>
              <DialogClose render={<Button variant="outline" />}>
                Decline
              </DialogClose>
              <DialogClose render={<Button />}>Accept</DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Example>
      <Example title="Extra overlay with portal">
        <Dialog>
          <DialogTrigger render={<Button variant="outline" />}>
            Blurred backdrop
          </DialogTrigger>
          <DialogPortal>
            <DialogOverlay className="backdrop-blur-sm" />
          </DialogPortal>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Blurred backdrop</DialogTitle>
              <DialogDescription>
                A second overlay rendered through the dialog portal blurs the
                page behind.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </Example>
    </div>
  )
}
