import * as React from "react"
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog"
import { Trash2Icon } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

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

function ControlledAlertDialog() {
  const [open, setOpen] = React.useState(false)
  const [result, setResult] = React.useState("No choice yet")

  return (
    <div className="flex flex-col items-start gap-2">
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger render={<Button variant="outline" />}>
          Leave page
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard unsaved changes?</AlertDialogTitle>
            <AlertDialogDescription>
              You edited the page title. Leaving now discards that edit.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setResult("Stayed on the page")}>
              Stay
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setResult("Changes discarded")
                setOpen(false)
              }}
            >
              Discard
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <p className="text-sm text-muted-foreground">Result: {result}</p>
    </div>
  )
}

export default function Demo() {
  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Default">
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="outline" />}>
            Show dialog
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This permanently deletes your account and removes your data from
                our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Example>
      <Example title="Small with media">
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="destructive" />}>
            Delete project
          </AlertDialogTrigger>
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogMedia className="bg-destructive/10 text-destructive">
                <Trash2Icon />
              </AlertDialogMedia>
              <AlertDialogTitle>Delete project?</AlertDialogTitle>
              <AlertDialogDescription>
                All pages and media in this project are deleted.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction variant="destructive">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Example>
      <Example title="Controlled">
        <ControlledAlertDialog />
      </Example>
      <Example title="Composed from portal and overlay">
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="secondary" />}>
            Blurred backdrop
          </AlertDialogTrigger>
          <AlertDialogPortal>
            <AlertDialogOverlay className="backdrop-blur-sm" />
            <AlertDialogPrimitive.Popup className="fixed top-1/2 left-1/2 z-50 grid w-full max-w-sm -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-background p-6 ring-1 ring-foreground/10 outline-none">
              <AlertDialogHeader>
                <AlertDialogTitle>Publish the site?</AlertDialogTitle>
                <AlertDialogDescription>
                  Visitors see the new version within a minute.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Not now</AlertDialogCancel>
                <AlertDialogCancel variant="default">Publish</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogPrimitive.Popup>
          </AlertDialogPortal>
        </AlertDialog>
      </Example>
    </div>
  )
}
