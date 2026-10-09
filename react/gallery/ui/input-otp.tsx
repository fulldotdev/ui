import * as React from "react"
import { REGEXP_ONLY_CHARS, REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Label } from "@/components/ui/label"

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
  const [value, setValue] = React.useState("")
  const [invalid, setInvalid] = React.useState("98")

  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="With separator">
        <InputOTP maxLength={6} aria-label="One-time code">
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </Example>
      <Example title="Controlled">
        <div className="flex flex-col gap-2">
          <Label htmlFor="otp-controlled">Verification code</Label>
          <InputOTP
            id="otp-controlled"
            maxLength={4}
            value={value}
            onChange={setValue}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-sm text-muted-foreground">
            {value.length === 4 ? `You entered ${value}.` : "Enter 4 digits."}
          </p>
        </div>
      </Example>
      <Example title="Letters and alphanumeric patterns">
        <InputOTP
          maxLength={4}
          pattern={REGEXP_ONLY_CHARS}
          aria-label="Letters only code"
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
        <InputOTP
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
          aria-label="Alphanumeric code"
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </Example>
      <Example title="Disabled and invalid">
        <InputOTP
          maxLength={4}
          disabled
          value="1234"
          aria-label="Disabled code"
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
        <InputOTP
          maxLength={4}
          value={invalid}
          onChange={setInvalid}
          aria-label="Invalid code"
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} aria-invalid />
            <InputOTPSlot index={1} aria-invalid />
            <InputOTPSlot index={2} aria-invalid />
            <InputOTPSlot index={3} aria-invalid />
          </InputOTPGroup>
        </InputOTP>
      </Example>
    </div>
  )
}
