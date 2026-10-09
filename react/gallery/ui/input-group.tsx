import * as React from "react"
import {
  ArrowUpIcon,
  CheckIcon,
  CopyIcon,
  EyeIcon,
  EyeOffIcon,
  MailIcon,
  SearchIcon,
} from "lucide-react"

import { Field, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"
import { Spinner } from "@/components/ui/spinner"

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

const link = "https://example.com/invite/4189"

export default function Demo() {
  const [visible, setVisible] = React.useState(false)
  const [copied, setCopied] = React.useState(false)
  const [message, setMessage] = React.useState("")

  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Icon and text addons">
        <InputGroup className="w-72">
          <InputGroupInput placeholder="Search" aria-label="Search" />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <Kbd>⌘K</Kbd>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup className="w-72">
          <InputGroupAddon>
            <InputGroupText>https://</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="example.com" aria-label="Website" />
          <InputGroupAddon align="inline-end">
            <InputGroupText>.com</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup className="w-72">
          <InputGroupAddon>
            <InputGroupText>€</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="0.00" aria-label="Price" />
          <InputGroupAddon align="inline-end">
            <InputGroupText>EUR</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </Example>
      <Example title="Buttons">
        <InputGroup className="w-72">
          <InputGroupInput
            type={visible ? "text" : "password"}
            defaultValue="correct horse"
            aria-label="Password"
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              size="icon-xs"
              aria-label={visible ? "Hide password" : "Show password"}
              onClick={() => setVisible((value) => !value)}
            >
              {visible ? <EyeOffIcon /> : <EyeIcon />}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup className="w-80">
          <InputGroupInput readOnly value={link} aria-label="Invite link" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              size="icon-xs"
              aria-label="Copy link"
              onClick={() => {
                void navigator.clipboard?.writeText(link)
                setCopied(true)
              }}
            >
              {copied ? <CheckIcon /> : <CopyIcon />}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup className="w-80">
          <InputGroupAddon>
            <MailIcon />
          </InputGroupAddon>
          <InputGroupInput placeholder="Email" aria-label="Email" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton variant="secondary" size="sm">
              Subscribe
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </Example>
      <Example title="States">
        <InputGroup className="w-72">
          <InputGroupInput
            placeholder="Loading"
            aria-label="Loading"
            disabled
          />
          <InputGroupAddon align="inline-end">
            <Spinner />
          </InputGroupAddon>
        </InputGroup>
        <InputGroup className="w-72">
          <InputGroupInput
            aria-label="Username"
            aria-invalid
            defaultValue="taken-name"
          />
          <InputGroupAddon align="inline-end">
            <InputGroupText>Taken</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </Example>
      <Example title="Textarea with block addons">
        <Field className="w-96">
          <FieldLabel htmlFor="input-group-message">Message</FieldLabel>
          <InputGroup>
            <InputGroupAddon align="block-start" className="border-b">
              <InputGroupText className="font-mono">notes.md</InputGroupText>
            </InputGroupAddon>
            <InputGroupTextarea
              id="input-group-message"
              placeholder="Write a message"
              maxLength={280}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
            <InputGroupAddon align="block-end">
              <InputGroupText>{message.length}/280 characters</InputGroupText>
              <InputGroupButton
                variant="default"
                size="icon-xs"
                className="ml-auto rounded-full"
                aria-label="Send"
                disabled={!message}
              >
                <ArrowUpIcon />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </Example>
    </div>
  )
}
