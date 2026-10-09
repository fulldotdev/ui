import * as React from "react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

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
  const [message, setMessage] = React.useState("")
  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Default">
        <div className="flex w-full max-w-sm flex-col gap-2">
          <Label htmlFor="textarea-message">Message</Label>
          <Textarea
            id="textarea-message"
            placeholder="Type your message here."
          />
        </div>
      </Example>
      <Example title="With description">
        <div className="flex w-full max-w-sm flex-col gap-2">
          <Label htmlFor="textarea-bio">Bio</Label>
          <Textarea
            id="textarea-bio"
            placeholder="Tell us a little about yourself."
            aria-describedby="textarea-bio-description"
          />
          <p
            id="textarea-bio-description"
            className="text-sm text-muted-foreground"
          >
            Shown on your public profile.
          </p>
        </div>
      </Example>
      <Example title="Disabled and invalid">
        <div className="flex w-full max-w-sm flex-col gap-2">
          <Label htmlFor="textarea-disabled">Notes</Label>
          <Textarea
            id="textarea-disabled"
            placeholder="Notes are closed."
            disabled
          />
        </div>
        <div className="flex w-full max-w-sm flex-col gap-2">
          <Label htmlFor="textarea-invalid">Feedback</Label>
          <Textarea
            id="textarea-invalid"
            defaultValue="Too short"
            aria-invalid="true"
            aria-describedby="textarea-invalid-error"
          />
          <p id="textarea-invalid-error" className="text-sm text-destructive">
            Write at least 20 characters.
          </p>
        </div>
      </Example>
      <Example title="Controlled with a button">
        <form
          className="flex w-full max-w-sm flex-col gap-2"
          onSubmit={(event) => {
            event.preventDefault()
            setMessage("")
          }}
        >
          <Label htmlFor="textarea-send">Reply</Label>
          <Textarea
            id="textarea-send"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Write a reply."
          />
          <p className="text-sm text-muted-foreground">
            {message.length} characters
          </p>
          <Button type="submit" disabled={!message}>
            Send message
          </Button>
        </form>
      </Example>
    </div>
  )
}
