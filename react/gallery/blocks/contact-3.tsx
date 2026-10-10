import { Contact3 } from "@/components/blocks/contact-3"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Contact3Demo() {
  return (
    <>
      <Contact3
        title="Let's build something great"
        description="Fill out the form and our team will get back to you within 24 hours."
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
                <FieldLabel htmlFor="contact-3-name">Name</FieldLabel>
                <Input
                  id="contact-3-name"
                  name="name"
                  autoComplete="name"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="contact-3-email">Email</FieldLabel>
                <Input
                  id="contact-3-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="contact-3-message">Message</FieldLabel>
              <Textarea
                id="contact-3-message"
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
      </Contact3>
    </>
  )
}
