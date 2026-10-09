import * as React from "react"

import { Checkbox } from "@/components/ui/checkbox"
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

const toppings = ["Cheese", "Mushrooms", "Olives"]

export default function Demo() {
  const [checked, setChecked] = React.useState(true)
  const [selected, setSelected] = React.useState<string[]>(["Cheese"])
  const allChecked = selected.length === toppings.length
  const someChecked = selected.length > 0 && !allChecked

  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Basic">
        <div className="flex items-center gap-2">
          <Checkbox id="checkbox-terms" />
          <Label htmlFor="checkbox-terms">Accept terms and conditions</Label>
        </div>
      </Example>
      <Example title="Controlled">
        <div className="flex items-center gap-2">
          <Checkbox
            id="checkbox-newsletter"
            checked={checked}
            onCheckedChange={setChecked}
          />
          <Label htmlFor="checkbox-newsletter">
            Newsletter ({checked ? "subscribed" : "not subscribed"})
          </Label>
        </div>
      </Example>
      <Example title="Disabled">
        <div className="flex items-center gap-2">
          <Checkbox id="checkbox-disabled" disabled />
          <Label htmlFor="checkbox-disabled">Disabled</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="checkbox-disabled-checked" disabled defaultChecked />
          <Label htmlFor="checkbox-disabled-checked">
            Disabled and checked
          </Label>
        </div>
      </Example>
      <Example title="Invalid">
        <div className="flex items-center gap-2">
          <Checkbox id="checkbox-invalid" aria-invalid />
          <Label htmlFor="checkbox-invalid">
            I agree to the privacy policy
          </Label>
        </div>
      </Example>
      <Example title="Indeterminate">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Checkbox
              id="checkbox-all"
              checked={allChecked}
              indeterminate={someChecked}
              onCheckedChange={(value) => setSelected(value ? toppings : [])}
            />
            <Label htmlFor="checkbox-all">All toppings</Label>
          </div>
          <div className="flex flex-col gap-3 ps-6">
            {toppings.map((topping) => (
              <div key={topping} className="flex items-center gap-2">
                <Checkbox
                  id={`checkbox-${topping}`}
                  checked={selected.includes(topping)}
                  onCheckedChange={(value) =>
                    setSelected((current) =>
                      value
                        ? [...current, topping]
                        : current.filter((item) => item !== topping)
                    )
                  }
                />
                <Label htmlFor={`checkbox-${topping}`}>{topping}</Label>
              </div>
            ))}
          </div>
        </div>
      </Example>
    </div>
  )
}
