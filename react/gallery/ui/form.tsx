import * as React from "react"

import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
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
  const [sent, setSent] = React.useState(false)
  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Contact form">
        <Form
          className="w-full max-w-md"
          onSubmit={(event) => {
            event.preventDefault()
            setSent(true)
          }}
        >
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="form-name">Name</FieldLabel>
              <Input id="form-name" name="name" autoComplete="name" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="form-email">Email</FieldLabel>
              <Input
                id="form-email"
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="form-message">Message</FieldLabel>
              <Textarea id="form-message" name="message" />
            </Field>
          </FieldGroup>
          <Button type="submit">Send message</Button>
          {sent && (
            <p role="status" className="text-sm text-muted-foreground">
              Thanks, the message was sent.
            </p>
          )}
        </Form>
      </Example>
    </div>
  )
}
