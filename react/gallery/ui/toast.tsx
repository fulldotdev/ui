import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  createToastManager,
  Toast,
  toast,
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  Toaster,
  ToastPortal,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  useToastManager,
} from "@/components/ui/toast"

// A second manager with its own provider and viewport, for the custom layout.
const customToast = createToastManager()

function CustomToastList() {
  const { toasts } = useToastManager()
  return toasts.map((item) => (
    <Toast key={item.id} toast={item}>
      <ToastContent className="items-start">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <ToastTitle />
          <ToastDescription />
          <div className="mt-2 flex gap-2">
            <ToastAction />
            <ToastClose render={<Button variant="ghost" size="sm" />}>
              Dismiss
            </ToastClose>
          </div>
        </div>
      </ToastContent>
    </Toast>
  ))
}

function CustomToastButton() {
  const manager = useToastManager()
  return (
    <Button
      variant="outline"
      onClick={() =>
        manager.add({
          title: "Invitation sent",
          description: "Ada can now edit this site.",
          timeout: 0,
          actionProps: {
            children: "Undo",
            onClick: () => manager.add({ title: "Invitation withdrawn" }),
          },
        })
      }
    >
      Custom layout
    </Button>
  )
}

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
  return (
    <div className="flex flex-col gap-10 p-6">
      <Toaster />
      <Example title="Default">
        <Button
          variant="outline"
          onClick={() =>
            toast.add({
              title: "Event created",
              description: "Sunday, December 3 at 9:00 AM",
            })
          }
        >
          Show toast
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.add({
              title: "Page deleted",
              description: "You can restore it for 30 days.",
              actionProps: {
                children: "Undo",
                onClick: () => toast.add({ title: "Page restored" }),
              },
            })
          }
        >
          With action
        </Button>
      </Example>
      <Example title="Types">
        {(["success", "info", "warning", "error", "loading"] as const).map(
          (type) => (
            <Button
              key={type}
              variant="outline"
              className="capitalize"
              onClick={() =>
                toast.add({
                  type,
                  title: `A ${type} toast`,
                  description: "Its icon follows the type.",
                })
              }
            >
              {type}
            </Button>
          )
        )}
      </Example>
      <Example title="Promise and close all">
        <Button
          variant="outline"
          onClick={() =>
            toast.promise(
              new Promise<string>((resolve) =>
                setTimeout(() => resolve("Homepage"), 2000)
              ),
              {
                loading: { title: "Publishing" },
                success: (name) => ({ title: `${name} is live` }),
                error: { title: "Publishing failed" },
              }
            )
          }
        >
          Publish
        </Button>
        <Button variant="ghost" onClick={() => toast.close()}>
          Close all
        </Button>
      </Example>
      <Example title="Custom provider, viewport and layout">
        <ToastProvider toastManager={customToast} limit={2}>
          <CustomToastButton />
          <ToastPortal>
            <ToastViewport className="sm:right-auto sm:left-4">
              <CustomToastList />
            </ToastViewport>
          </ToastPortal>
        </ToastProvider>
      </Example>
    </div>
  )
}
