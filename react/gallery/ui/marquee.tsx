import * as React from "react"

import {
  Marquee,
  MarqueeContent,
  MarqueeItem,
  MarqueeToggle,
  useMarquee,
} from "@/components/ui/marquee"

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

const topics = [
  "React",
  "Tailwind CSS",
  "TypeScript",
  "Base UI",
  "Design tokens",
  "Accessibility",
  "Responsive images",
  "Server rendering",
  "Registries",
  "Themes",
  "Dark mode",
  "Forms",
  "Navigation",
  "Search",
  "Localization",
  "Performance",
]

function Row({
  reverse,
  items = topics,
}: {
  reverse?: boolean
  items?: string[]
}) {
  return (
    <MarqueeContent reverse={reverse} className="w-full mask-x-from-90%">
      {items.map((item) => (
        <MarqueeItem key={item}>
          <span className="text-sm whitespace-nowrap text-muted-foreground">
            {item}
          </span>
        </MarqueeItem>
      ))}
    </MarqueeContent>
  )
}

// Reads the marquee state, for example for a custom control.
function Status() {
  const { moving, playing } = useMarquee()
  return (
    <p className="me-auto text-sm text-muted-foreground" aria-live="polite">
      {moving ? (playing ? "Moving" : "Paused") : "Static"}
    </p>
  )
}

export default function Demo() {
  const [disabled, setDisabled] = React.useState(false)
  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Default">
        <Marquee
          data-testid="marquee-default"
          className="flex w-full flex-col items-end gap-4"
        >
          <div className="flex w-full items-center gap-2">
            <Status />
            <MarqueeToggle playLabel="Play" pauseLabel="Pause" />
          </div>
          <Row />
        </Marquee>
      </Example>
      <Example title="Rows, one reversed">
        <Marquee className="flex w-full flex-col items-end gap-4">
          <MarqueeToggle playLabel="Play" pauseLabel="Pause" />
          <Row />
          <Row reverse />
        </Marquee>
      </Example>
      <Example title="Links in the row">
        <Marquee className="flex w-full flex-col items-end gap-4 [--marquee-gap:--spacing(8)]">
          <MarqueeToggle playLabel="Play" pauseLabel="Pause" />
          <MarqueeContent className="w-full mask-x-from-90%">
            {topics.map((item) => (
              <MarqueeItem key={item}>
                <a
                  href={`#/ui/marquee?topic=${encodeURIComponent(item)}`}
                  className="text-sm whitespace-nowrap underline-offset-4 hover:underline"
                >
                  {item}
                </a>
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </Marquee>
      </Example>
      <Example title="Few items stay static">
        <Marquee data-testid="marquee-few" className="w-full">
          <MarqueeToggle playLabel="Play" pauseLabel="Pause" />
          <Row items={["Tailwind CSS", "PostCSS", "Vite"]} />
        </Marquee>
      </Example>
      <Example title="No toggle stays static">
        <Marquee data-testid="marquee-no-toggle" className="w-full">
          <Row />
        </Marquee>
      </Example>
      <Example title="Disabled toggle in a fieldset">
        <div className="flex w-full flex-col gap-3">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={disabled}
              onChange={(event) => setDisabled(event.target.checked)}
            />
            Disable the fieldset
          </label>
          <fieldset disabled={disabled} className="w-full">
            <Marquee
              data-testid="marquee-fieldset"
              className="flex w-full flex-col items-end gap-4"
            >
              <MarqueeToggle playLabel="Play" pauseLabel="Pause" />
              <Row />
            </Marquee>
          </fieldset>
        </div>
      </Example>
      <Example title="Toggle hidden below the md breakpoint">
        <Marquee
          data-testid="marquee-breakpoint"
          className="flex w-full flex-col items-end gap-4"
        >
          <div className="hidden md:block">
            <MarqueeToggle playLabel="Play" pauseLabel="Pause" />
          </div>
          <Row />
        </Marquee>
      </Example>
    </div>
  )
}
