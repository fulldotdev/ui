import * as React from "react"
import type { DateRange } from "react-day-picker"

import { Calendar, CalendarDayButton } from "@/components/ui/calendar"

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

// Fixed dates keep the server and client render the same.
const month = new Date(2026, 9, 1)

function SingleCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 9, 9))

  return (
    <div className="flex flex-col gap-2">
      <Calendar
        mode="single"
        labels={{ labelNav: () => "Single date months" }}
        selected={date}
        onSelect={setDate}
        defaultMonth={month}
        className="rounded-lg border"
      />
      <p className="text-sm text-muted-foreground">
        Selected: {date ? date.toDateString() : "none"}
      </p>
    </div>
  )
}

function RangeCalendar() {
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(2026, 9, 12),
    to: new Date(2026, 9, 16),
  })

  return (
    <Calendar
      mode="range"
      labels={{ labelNav: () => "Range months" }}
      selected={range}
      onSelect={setRange}
      defaultMonth={month}
      numberOfMonths={2}
      className="rounded-lg border"
    />
  )
}

const prices: Record<number, number> = { 3: 89, 10: 79, 17: 99, 24: 69 }

export default function Demo() {
  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Single date">
        <SingleCalendar />
      </Example>
      <Example title="Range over two months">
        <RangeCalendar />
      </Example>
      <Example title="Month and year dropdowns">
        <Calendar
          mode="single"
          labels={{ labelNav: () => "Dropdown months" }}
          captionLayout="dropdown"
          defaultMonth={month}
          startMonth={new Date(2020, 0)}
          endMonth={new Date(2030, 11)}
          className="rounded-lg border"
        />
      </Example>
      <Example title="Disabled weekends and week numbers">
        <Calendar
          mode="single"
          labels={{ labelNav: () => "Week number months" }}
          defaultMonth={month}
          disabled={{ dayOfWeek: [0, 6] }}
          showWeekNumber
          className="rounded-lg border"
        />
      </Example>
      <Example title="Custom day button">
        <Calendar
          mode="single"
          labels={{ labelNav: () => "Custom day months" }}
          defaultMonth={month}
          className="rounded-lg border [--cell-size:--spacing(11)]"
          components={{
            DayButton: ({ children, modifiers, day, ...props }) => {
              const price = prices[day.date.getDate()]
              return (
                <CalendarDayButton day={day} modifiers={modifiers} {...props}>
                  {children}
                  {!modifiers.outside && price && <span>€{price}</span>}
                </CalendarDayButton>
              )
            },
          }}
        />
      </Example>
    </div>
  )
}
