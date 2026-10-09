import * as React from "react"
import { CircleAlertIcon, CircleCheckIcon, InfoIcon } from "lucide-react"

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
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

export default function Demo() {
  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Default">
        <Alert className="max-w-md">
          <CircleCheckIcon />
          <AlertTitle>Your changes have been saved</AlertTitle>
          <AlertDescription>
            The new opening hours are live on your website.
          </AlertDescription>
        </Alert>
      </Example>
      <Example title="Destructive">
        <Alert variant="destructive" className="max-w-md">
          <CircleAlertIcon />
          <AlertTitle>Payment failed</AlertTitle>
          <AlertDescription>
            <p>We could not charge your card. Check these details:</p>
            <ul className="list-inside list-disc text-sm">
              <li>Card number and expiry date</li>
              <li>Available balance</li>
            </ul>
          </AlertDescription>
        </Alert>
      </Example>
      <Example title="With action">
        <Alert className="max-w-md">
          <InfoIcon />
          <AlertTitle>A new version is available</AlertTitle>
          <AlertDescription>
            Update to get the latest components. Read the{" "}
            <a href="#/ui/alert">release notes</a>.
          </AlertDescription>
          <AlertAction>
            <Button size="xs">Update</Button>
          </AlertAction>
        </Alert>
      </Example>
      <Example title="Title only">
        <Alert className="max-w-md">
          <InfoIcon />
          <AlertTitle>Maintenance is planned for Sunday at 02:00.</AlertTitle>
        </Alert>
      </Example>
    </div>
  )
}
