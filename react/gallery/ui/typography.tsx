import * as React from "react"

import {
  Typography,
  TypographyA,
  TypographyBlockquote,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyInlineCode,
  TypographyLead,
  TypographyList,
  TypographyListItem,
  TypographyP,
  TypographyTable,
  TypographyTableCell,
  TypographyTableHead,
  TypographyTableRow,
} from "@/components/ui/typography"

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
  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Prose from plain HTML">
        <Typography render={<article />} className="max-w-prose">
          <h2>Ship content pages faster</h2>
          <p>
            Typography styles the HTML inside it, such as Markdown output, with{" "}
            <a href="#/ui/typography">links</a>, <code>inline code</code> and
            lists.
          </p>
          <ul>
            <li>Headings, paragraphs and lists</li>
            <li>Tables and quotes</li>
          </ul>
          <blockquote>Good defaults let the content lead.</blockquote>
        </Typography>
      </Example>
      <Example title="Sizes">
        <Typography size="sm" className="max-w-xs">
          <p>Small prose for sidebars and captions.</p>
        </Typography>
        <Typography size="lg" className="max-w-xs">
          <p>Large prose for long reads.</p>
        </Typography>
      </Example>
      <Example title="Parts">
        <div className="flex max-w-prose flex-col">
          <TypographyH1>Heading one</TypographyH1>
          <TypographyLead>A lead paragraph introduces the page.</TypographyLead>
          <TypographyH2 className="mt-10">Heading two</TypographyH2>
          <TypographyH3 className="mt-8">Heading three</TypographyH3>
          <TypographyH4 className="mt-6">Heading four</TypographyH4>
          <TypographyP>
            A paragraph with{" "}
            <TypographyInlineCode>inline code</TypographyInlineCode> and a{" "}
            <TypographyA href="#/ui/typography">link</TypographyA>.
          </TypographyP>
          <TypographyBlockquote>A quote stands apart.</TypographyBlockquote>
          <TypographyList>
            <TypographyListItem>Unordered item</TypographyListItem>
            <TypographyListItem>Another item</TypographyListItem>
          </TypographyList>
          <TypographyList as="ol" size="sm">
            <TypographyListItem size="sm">First step</TypographyListItem>
            <TypographyListItem size="sm">Second step</TypographyListItem>
          </TypographyList>
          <TypographyTable>
            <thead>
              <TypographyTableRow>
                <TypographyTableHead>Plan</TypographyTableHead>
                <TypographyTableHead align="right">Price</TypographyTableHead>
              </TypographyTableRow>
            </thead>
            <tbody>
              <TypographyTableRow>
                <TypographyTableCell>Starter</TypographyTableCell>
                <TypographyTableCell align="right">€9</TypographyTableCell>
              </TypographyTableRow>
              <TypographyTableRow>
                <TypographyTableCell>Team</TypographyTableCell>
                <TypographyTableCell align="right">€29</TypographyTableCell>
              </TypographyTableRow>
            </tbody>
          </TypographyTable>
        </div>
      </Example>
    </div>
  )
}
