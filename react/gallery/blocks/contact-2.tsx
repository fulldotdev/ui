import { Contact2 } from "@/components/blocks/contact-2"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Contact2Demo() {
  return (
    <>
      <Contact2
        title="Let's work together"
        description="Tell us about the site, timeline, and what kind of help you need."
        contactItems={[
          {
            icon: "mail",
            title: "Email",
            description: "contact@full.dev",
            href: "mailto:contact@full.dev",
          },
          {
            icon: "phone",
            title: "Phone",
            description: "+31 6 83485163",
            href: "tel:+31683485163",
          },
          {
            icon: "map-pin",
            title: "Office",
            description: "Vismarkt 5a, 9712 CA Groningen",
            href: "https://maps.google.com/?q=Vismarkt%205a%2C%209712%20CA%20Groningen",
          },
          {
            icon: "clock",
            title: "Hours",
            description: "Weekdays, 9 am to 6 pm CET",
          },
        ]}
      >
        <Form method="post">
          <FieldGroup>
            <div className="grid gap-4 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="contact-2-name">Name</FieldLabel>
                <Input
                  id="contact-2-name"
                  name="name"
                  autoComplete="name"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="contact-2-email">Email</FieldLabel>
                <Input
                  id="contact-2-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="contact-2-message">Message</FieldLabel>
              <Textarea
                id="contact-2-message"
                name="message"
                rows={5}
                required
              />
            </Field>
            <Button type="submit" size="lg" className="w-full">
              Send message
            </Button>
          </FieldGroup>
        </Form>
      </Contact2>
    </>
  )
}
