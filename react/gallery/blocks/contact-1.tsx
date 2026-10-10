import { Contact1 } from "@/components/blocks/contact-1"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Contact1Demo() {
  return (
    <>
      <Contact1
        title="Get in touch with us"
        description="Have a project in mind? Reach out and let us help you build something great."
        contactItems={[
          {
            icon: "mail",
            title: "Email us",
            description: "contact@full.dev",
            href: "mailto:contact@full.dev",
          },
          {
            icon: "phone",
            title: "Call us",
            description: "+31 6 83485163",
            href: "tel:+31683485163",
          },
          {
            icon: "map-pin",
            title: "Visit us",
            description: "Vismarkt 5a, 9712 CA Groningen",
            href: "https://maps.google.com/?q=Vismarkt%205a%2C%209712%20CA%20Groningen",
          },
          {
            icon: "clock",
            title: "Support hours",
            description: "Weekdays, 9 am to 6 pm CET",
          },
        ]}
      >
        <Form method="post">
          <FieldGroup>
            <div className="grid gap-4 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="contact-1-name">Name</FieldLabel>
                <Input
                  id="contact-1-name"
                  name="name"
                  autoComplete="name"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="contact-1-email">Email</FieldLabel>
                <Input
                  id="contact-1-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="contact-1-message">Message</FieldLabel>
              <Textarea
                id="contact-1-message"
                name="message"
                rows={5}
                required
                aria-describedby="contact-1-message-description"
              />
              <FieldDescription id="contact-1-message-description">
                Include goals, team size, and any hard deadlines.
              </FieldDescription>
            </Field>
            <Button type="submit" size="lg" className="w-full">
              Send message
            </Button>
          </FieldGroup>
        </Form>
      </Contact1>
    </>
  )
}
