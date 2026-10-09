import * as React from "react"

import { Contact1 } from "@/components/blocks/contact-1"
import { Contact2 } from "@/components/blocks/contact-2"
import { Contact3 } from "@/components/blocks/contact-3"
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

const demos: Record<string, React.ComponentType> = {
  "contact-1": () => {
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
  },
  "contact-2": () => {
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
  },
  "contact-3": () => {
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
  },
}

export default demos
