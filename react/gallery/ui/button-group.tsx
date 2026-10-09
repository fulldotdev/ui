import * as React from "react"
import {
  ArchiveIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MinusIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
} from "@/components/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
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

function Quantity() {
  const [count, setCount] = React.useState(1)

  return (
    <ButtonGroup aria-label="Quantity">
      <Button
        variant="outline"
        size="icon"
        aria-label="Decrease"
        disabled={count <= 1}
        onClick={() => setCount((value) => value - 1)}
      >
        <MinusIcon />
      </Button>
      <ButtonGroupText className="min-w-10 justify-center tabular-nums">
        {count}
      </ButtonGroupText>
      <Button
        variant="outline"
        size="icon"
        aria-label="Increase"
        onClick={() => setCount((value) => value + 1)}
      >
        <PlusIcon />
      </Button>
    </ButtonGroup>
  )
}

export default function Demo() {
  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Horizontal">
        <ButtonGroup aria-label="Message actions">
          <Button variant="outline">Archive</Button>
          <Button variant="outline">Report</Button>
          <Button variant="outline">Snooze</Button>
        </ButtonGroup>
      </Example>
      <Example title="Vertical">
        <ButtonGroup orientation="vertical" aria-label="Zoom">
          <Button variant="outline" size="icon" aria-label="Zoom in">
            <PlusIcon />
          </Button>
          <Button variant="outline" size="icon" aria-label="Zoom out">
            <MinusIcon />
          </Button>
        </ButtonGroup>
      </Example>
      <Example title="Separator and split button">
        <ButtonGroup>
          <Button variant="secondary">
            <ArchiveIcon data-icon="inline-start" />
            Archive
          </Button>
          <ButtonGroupSeparator />
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="secondary"
                  size="icon"
                  aria-label="More archive options"
                />
              }
            >
              <ChevronDownIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Archive all read</DropdownMenuItem>
              <DropdownMenuItem>Archive older than 30 days</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ButtonGroup>
      </Example>
      <Example title="Text and input">
        <ButtonGroup>
          <ButtonGroupText render={<Label htmlFor="button-group-url" />}>
            https://
          </ButtonGroupText>
          <Input id="button-group-url" placeholder="example.com" />
          <Button variant="outline" aria-label="Search">
            <SearchIcon />
          </Button>
        </ButtonGroup>
      </Example>
      <Example title="Interactive">
        <Quantity />
      </Example>
      <Example title="Nested groups">
        <ButtonGroup>
          <ButtonGroup>
            <Button variant="outline" size="icon" aria-label="Previous">
              <ChevronLeftIcon />
            </Button>
            <Button variant="outline" size="icon" aria-label="Next">
              <ChevronRightIcon />
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="outline">Today</Button>
          </ButtonGroup>
        </ButtonGroup>
      </Example>
      <Example title="Pagination styled with buttonGroupVariants">
        <nav
          aria-label="Pagination"
          className={buttonGroupVariants({ orientation: "horizontal" })}
        >
          <Button variant="outline" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
        </nav>
      </Example>
    </div>
  )
}
