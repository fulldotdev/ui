import * as React from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
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
  const [email, setEmail] = React.useState("ada@example")
  const emailInvalid = !/^\S+@\S+\.\S+$/.test(email)

  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Form with fieldsets">
        <form
          className="w-full max-w-md"
          onSubmit={(event) => event.preventDefault()}
        >
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Payment method</FieldLegend>
              <FieldDescription>
                All transactions are secure and encrypted.
              </FieldDescription>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="field-card-name">
                    Name on card
                  </FieldLabel>
                  <Input id="field-card-name" placeholder="Ada Lovelace" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="field-card-number">
                    Card number
                  </FieldLabel>
                  <Input
                    id="field-card-number"
                    placeholder="1234 5678 9012 3456"
                  />
                  <FieldDescription>
                    Enter your 16 digit number.
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </FieldSet>
            <FieldSeparator />
            <FieldSet>
              <FieldLegend>Billing address</FieldLegend>
              <Field orientation="horizontal">
                <Checkbox id="field-same-address" defaultChecked />
                <FieldLabel htmlFor="field-same-address">
                  Same as shipping address
                </FieldLabel>
              </Field>
            </FieldSet>
            <FieldSeparator>Or</FieldSeparator>
            <Field>
              <FieldLabel htmlFor="field-comments">Comments</FieldLabel>
              <Textarea
                id="field-comments"
                placeholder="Add any additional comments"
              />
            </Field>
            <Field orientation="horizontal">
              <Button type="submit">Submit</Button>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </Example>
      <Example title="Validation">
        <FieldGroup className="w-full max-w-md">
          <Field data-invalid={emailInvalid || undefined}>
            <FieldLabel htmlFor="field-email">Email</FieldLabel>
            <Input
              id="field-email"
              type="email"
              value={email}
              aria-invalid={emailInvalid}
              onChange={(event) => setEmail(event.target.value)}
            />
            <FieldDescription>We only use this for receipts.</FieldDescription>
            {emailInvalid && (
              <FieldError>Enter a valid email address.</FieldError>
            )}
          </Field>
          <Field data-invalid>
            <FieldLabel htmlFor="field-password">Password</FieldLabel>
            <Input id="field-password" type="password" aria-invalid />
            <FieldError
              errors={[
                { message: "Use at least 8 characters." },
                { message: "Include a number." },
              ]}
            />
          </Field>
          <Field data-disabled>
            <FieldLabel htmlFor="field-disabled">Username</FieldLabel>
            <Input id="field-disabled" disabled defaultValue="ada" />
            <FieldDescription>Usernames cannot be changed.</FieldDescription>
          </Field>
        </FieldGroup>
      </Example>
      <Example title="Horizontal with content">
        <FieldGroup className="w-full max-w-md">
          <Field orientation="horizontal">
            <FieldContent>
              <FieldLabel htmlFor="field-marketing">
                Marketing emails
              </FieldLabel>
              <FieldDescription>
                Receive emails about new products and features.
              </FieldDescription>
            </FieldContent>
            <Switch id="field-marketing" />
          </Field>
          <FieldLabel htmlFor="field-touch-id">
            <Field orientation="horizontal">
              <Checkbox id="field-touch-id" />
              <FieldContent>
                <FieldTitle>Enable Touch ID</FieldTitle>
                <FieldDescription>
                  Unlock your device faster with your fingerprint.
                </FieldDescription>
              </FieldContent>
            </Field>
          </FieldLabel>
        </FieldGroup>
      </Example>
      <Example title="Radio choice cards">
        <FieldSet className="w-full max-w-md">
          <FieldLegend variant="label">Plan</FieldLegend>
          <FieldDescription>
            You can change your plan at any time.
          </FieldDescription>
          <RadioGroup defaultValue="pro">
            {[
              {
                value: "starter",
                title: "Starter",
                text: "For a single site.",
              },
              { value: "pro", title: "Pro", text: "For growing teams." },
            ].map((plan) => (
              <FieldLabel key={plan.value} htmlFor={`field-plan-${plan.value}`}>
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>{plan.title}</FieldTitle>
                    <FieldDescription>{plan.text}</FieldDescription>
                  </FieldContent>
                  <RadioGroupItem
                    value={plan.value}
                    id={`field-plan-${plan.value}`}
                  />
                </Field>
              </FieldLabel>
            ))}
          </RadioGroup>
        </FieldSet>
      </Example>
      <Example title="Responsive orientation">
        <FieldGroup className="w-full max-w-2xl">
          <Field orientation="responsive">
            <FieldContent>
              <FieldLabel htmlFor="field-site-name">Site name</FieldLabel>
              <FieldDescription>Shown in the browser tab.</FieldDescription>
            </FieldContent>
            <Input id="field-site-name" defaultValue="Fulldev" />
          </Field>
        </FieldGroup>
      </Example>
    </div>
  )
}
