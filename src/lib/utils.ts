import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function money(
  amount: number,
  currency: string = "EUR",
  locale: string = "nl-NL"
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount)
}

export function discount(before: number, after: number) {
  return `-${Math.round(((before - after) / before) * 100)}%`
}
