import * as React from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"

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
      <Example title="Default with action">
        <Button
          variant="outline"
          onClick={() =>
            toast("Event has been created", {
              description: "Sunday, December 3 at 9:00 AM",
              action: {
                label: "Undo",
                onClick: () => toast("Event removed"),
              },
            })
          }
        >
          Show toast
        </Button>
      </Example>
      <Example title="Types">
        <Button
          variant="outline"
          onClick={() => toast.success("Changes saved")}
        >
          Success
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.info("A new version is available")}
        >
          Info
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.warning("Your plan renews tomorrow")}
        >
          Warning
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.error("The page could not be published")}
        >
          Error
        </Button>
        <Button variant="outline" onClick={() => toast.loading("Uploading")}>
          Loading
        </Button>
      </Example>
      <Example title="Promise">
        <Button
          variant="outline"
          onClick={() =>
            toast.promise(
              new Promise<{ name: string }>((resolve) =>
                setTimeout(() => resolve({ name: "Homepage" }), 2000)
              ),
              {
                loading: "Publishing",
                success: (data) => `${data.name} is live`,
                error: "Publishing failed",
              }
            )
          }
        >
          Publish
        </Button>
        <Button variant="ghost" onClick={() => toast.dismiss()}>
          Dismiss all
        </Button>
      </Example>
    </div>
  )
}
