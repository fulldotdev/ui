import * as React from "react"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const invoices = [
  { invoice: "INV001", status: "Paid", method: "Credit card", amount: 250 },
  { invoice: "INV002", status: "Pending", method: "PayPal", amount: 150 },
  { invoice: "INV003", status: "Unpaid", method: "Bank transfer", amount: 350 },
  { invoice: "INV004", status: "Paid", method: "Credit card", amount: 450 },
  { invoice: "INV005", status: "Paid", method: "PayPal", amount: 550 },
]

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

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
  const total = invoices.reduce((sum, item) => sum + item.amount, 0)
  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Invoices">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((item) => (
              <TableRow key={item.invoice}>
                <TableCell className="font-medium">{item.invoice}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.method}</TableCell>
                <TableCell className="text-right">
                  {currency.format(item.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">
                {currency.format(total)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Example>
      <Example title="Selected row">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Plan</TableHead>
              <TableHead>Pages</TableHead>
              <TableHead className="text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Starter</TableCell>
              <TableCell>5</TableCell>
              <TableCell className="text-right">
                {currency.format(29)}
              </TableCell>
            </TableRow>
            <TableRow data-state="selected" aria-selected="true">
              <TableCell>Business</TableCell>
              <TableCell>20</TableCell>
              <TableCell className="text-right">
                {currency.format(79)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Enterprise</TableCell>
              <TableCell>Unlimited</TableCell>
              <TableCell className="text-right">
                {currency.format(199)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Example>
    </div>
  )
}
