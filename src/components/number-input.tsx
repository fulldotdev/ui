import * as React from "react"
import { Minus, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { Input } from "./ui/input"

type Props = React.ComponentProps<"div"> & {
  min?: number
  max?: number
  defaultValue?: number
}

function NumberInput({
  min = 0,
  max = 100,
  defaultValue,
  className,
  ...props
}: Props) {
  const [quantity, setQuantity] = React.useState(0)

  function handleClick(value: number) {
    const newQuantity = quantity + value
    if (newQuantity >= min && newQuantity <= max) {
      setQuantity(newQuantity)
    }
  }

  return (
    <div
      className={cn("number-input relative flex items-center", className)}
      {...props}
    >
      <Button
        className="absolute left-0 aspect-square h-full"
        variant="ghost"
        size="icon"
        onClick={() => handleClick(-1)}
      >
        <Minus />
      </Button>
      <Input
        className="px-10 text-center"
        type="number"
        min={min}
        max={max}
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <Button
        className="absolute right-0 aspect-square h-full"
        variant="ghost"
        size="icon"
        onClick={() => handleClick(1)}
      >
        <Plus />
      </Button>
    </div>
  )
}
export { NumberInput }
