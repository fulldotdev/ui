"use client"

import * as React from "react"
import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field"
import { cn } from "cn"
import { MinusIcon, PlusIcon } from "lucide-react"

import { InputGroupAddon, InputGroupButton } from "@/components/ui/input-group"

function NumberField({
  className,
  disabled,
  ...props
}: Omit<NumberFieldPrimitive.Root.Props, "className"> & {
  className?: string
}) {
  return (
    <NumberFieldPrimitive.Root
      data-slot="number-field"
      data-disabled={disabled ? "true" : undefined}
      role="group"
      disabled={disabled}
      className={cn(
        "cn-fd-number-field group/input-group relative flex w-32 min-w-0 items-center outline-none",
        className
      )}
      {...props}
    />
  )
}

function NumberFieldInput({
  className,
  ...props
}: Omit<NumberFieldPrimitive.Input.Props, "className"> & {
  className?: string
}) {
  return (
    <NumberFieldPrimitive.Input
      data-slot="input-group-control"
      className={cn(
        "cn-input cn-input-group-input w-full min-w-0 flex-1 text-center tabular-nums outline-none placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function NumberFieldDecrement({
  children,
  "aria-label": ariaLabel = "Decrease",
  ...props
}: NumberFieldPrimitive.Decrement.Props) {
  return (
    <InputGroupAddon align="inline-start">
      <NumberFieldPrimitive.Decrement
        data-slot="number-field-decrement"
        aria-label={ariaLabel}
        render={<InputGroupButton size="icon-xs" />}
        {...props}
      >
        {children ?? <MinusIcon aria-hidden="true" />}
      </NumberFieldPrimitive.Decrement>
    </InputGroupAddon>
  )
}

function NumberFieldIncrement({
  children,
  "aria-label": ariaLabel = "Increase",
  ...props
}: NumberFieldPrimitive.Increment.Props) {
  return (
    <InputGroupAddon align="inline-end">
      <NumberFieldPrimitive.Increment
        data-slot="number-field-increment"
        aria-label={ariaLabel}
        render={<InputGroupButton size="icon-xs" />}
        {...props}
      >
        {children ?? <PlusIcon aria-hidden="true" />}
      </NumberFieldPrimitive.Increment>
    </InputGroupAddon>
  )
}

export {
  NumberField,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
}
