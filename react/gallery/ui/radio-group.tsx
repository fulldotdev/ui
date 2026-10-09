import * as React from "react"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

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

const plans = [
  { value: "starter", label: "Starter", description: "For a single site." },
  { value: "pro", label: "Pro", description: "For agencies with clients." },
  { value: "team", label: "Team", description: "For larger teams." },
]

export default function Demo() {
  const [plan, setPlan] = React.useState("pro")

  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Default">
        <RadioGroup defaultValue="comfortable" className="w-fit">
          <div className="flex items-center gap-3">
            <RadioGroupItem value="default" id="radio-default" />
            <Label htmlFor="radio-default">Default</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="comfortable" id="radio-comfortable" />
            <Label htmlFor="radio-comfortable">Comfortable</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="compact" id="radio-compact" />
            <Label htmlFor="radio-compact">Compact</Label>
          </div>
        </RadioGroup>
      </Example>

      <Example title="Controlled with descriptions">
        <FieldSet className="w-full max-w-sm">
          <FieldLegend variant="label">Plan</FieldLegend>
          <RadioGroup
            value={plan}
            onValueChange={(value) => setPlan(String(value))}
          >
            {plans.map((item) => (
              <Field key={item.value} orientation="horizontal">
                <RadioGroupItem value={item.value} id={`plan-${item.value}`} />
                <FieldContent>
                  <FieldLabel htmlFor={`plan-${item.value}`}>
                    {item.label}
                  </FieldLabel>
                  <FieldDescription>{item.description}</FieldDescription>
                </FieldContent>
              </Field>
            ))}
          </RadioGroup>
          <p className="text-sm text-muted-foreground">Selected: {plan}</p>
        </FieldSet>
      </Example>

      <Example title="Disabled">
        <RadioGroup defaultValue="email" className="w-fit">
          <div className="flex items-center gap-3">
            <RadioGroupItem value="email" id="radio-email" />
            <Label htmlFor="radio-email">Email</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="sms" id="radio-sms" disabled />
            <Label htmlFor="radio-sms">SMS (unavailable)</Label>
          </div>
        </RadioGroup>
        <RadioGroup defaultValue="on" disabled className="w-fit">
          <div className="flex items-center gap-3">
            <RadioGroupItem value="on" id="radio-group-on" />
            <Label htmlFor="radio-group-on">Whole group disabled</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="off" id="radio-group-off" />
            <Label htmlFor="radio-group-off">Off</Label>
          </div>
        </RadioGroup>
      </Example>

      <Example title="Invalid">
        <RadioGroup aria-invalid className="w-fit" aria-label="Delivery">
          <div className="flex items-center gap-3">
            <RadioGroupItem value="pickup" id="radio-pickup" aria-invalid />
            <Label htmlFor="radio-pickup">Pick up</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="ship" id="radio-ship" aria-invalid />
            <Label htmlFor="radio-ship">Ship</Label>
          </div>
        </RadioGroup>
      </Example>
    </div>
  )
}
