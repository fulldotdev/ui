import * as React from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
} from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

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

const visits = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const visitsConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig

const revenueConfig = {
  revenue: {
    label: "Revenue",
    theme: { light: "oklch(0.55 0.2 260)", dark: "oklch(0.75 0.15 260)" },
  },
} satisfies ChartConfig

const revenue = [
  { month: "Jan", revenue: 4200 },
  { month: "Feb", revenue: 5100 },
  { month: "Mar", revenue: 4800 },
  { month: "Apr", revenue: 6300 },
  { month: "May", revenue: 7100 },
  { month: "Jun", revenue: 6900 },
]

export default function Demo() {
  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Bar chart with tooltip and legend">
        <ChartContainer
          config={visitsConfig}
          className="min-h-52 w-full max-w-lg"
        >
          <BarChart accessibilityLayer data={visits}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value: string) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </Example>
      <Example title="Line chart with line indicator and theme colors">
        <ChartContainer
          config={revenueConfig}
          className="min-h-52 w-full max-w-lg"
        >
          <LineChart
            accessibilityLayer
            data={revenue}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="revenue"
              type="monotone"
              stroke="var(--color-revenue)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </Example>
      <Example title="Stacked area with dashed indicator">
        <ChartContainer
          config={visitsConfig}
          className="min-h-52 w-full max-w-lg"
        >
          <AreaChart
            accessibilityLayer
            data={visits}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value: string) => value.slice(0, 3)}
            />
            <ChartTooltip
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="var(--color-mobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </Example>
      <Example title="Config colors outside a chart with ChartStyle">
        <div
          data-chart="chart-swatches"
          className="flex items-center gap-4 text-sm"
        >
          <ChartStyle id="chart-swatches" config={visitsConfig} />
          {Object.entries(visitsConfig).map(([key, item]) => (
            <span key={key} className="flex items-center gap-2">
              <span
                className="size-3 rounded-sm"
                style={{ backgroundColor: `var(--color-${key})` }}
              />
              {item.label}
            </span>
          ))}
        </div>
      </Example>
    </div>
  )
}
