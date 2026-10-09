import * as React from "react"

import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@/components/ui/bubble"

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

const variants = [
  "default",
  "secondary",
  "muted",
  "tinted",
  "outline",
  "ghost",
  "destructive",
] as const

function ReactionBubble() {
  const [liked, setLiked] = React.useState(false)

  return (
    <Bubble variant="secondary" className="mb-4">
      <BubbleContent
        render={<button type="button" aria-pressed={liked} />}
        onClick={() => setLiked((value) => !value)}
      >
        Tap this message to {liked ? "remove your" : "add a"} reaction.
      </BubbleContent>
      {liked && (
        <BubbleReactions>
          <span role="img" aria-label="Heart reaction">
            ❤️
          </span>
        </BubbleReactions>
      )}
    </Bubble>
  )
}

export default function Demo() {
  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Conversation">
        <BubbleGroup className="w-full max-w-md">
          <Bubble variant="muted">
            <BubbleContent>
              Hi! Is the table for four still free tonight?
            </BubbleContent>
          </Bubble>
          <Bubble align="end">
            <BubbleContent>
              Yes, from 19:00. Shall I book it for you?
            </BubbleContent>
          </Bubble>
          <Bubble variant="muted">
            <BubbleContent>Please do, under the name Visser.</BubbleContent>
          </Bubble>
          <Bubble align="end">
            <BubbleContent>Done. See you tonight!</BubbleContent>
          </Bubble>
        </BubbleGroup>
      </Example>
      <Example title="Variants">
        <BubbleGroup className="w-full max-w-md">
          {variants.map((variant) => (
            <Bubble key={variant} variant={variant}>
              <BubbleContent>This is the {variant} variant.</BubbleContent>
            </Bubble>
          ))}
        </BubbleGroup>
      </Example>
      <Example title="Reactions">
        <BubbleGroup className="w-full max-w-md gap-6">
          <Bubble variant="muted">
            <BubbleContent>The new menu is online.</BubbleContent>
            <BubbleReactions>
              <span role="img" aria-label="Thumbs up">
                👍
              </span>
              <span className="text-xs text-muted-foreground">2</span>
            </BubbleReactions>
          </Bubble>
          <Bubble align="end" className="mt-4">
            <BubbleContent>Looks great, thanks!</BubbleContent>
            <BubbleReactions side="top" align="start">
              <span role="img" aria-label="Party popper">
                🎉
              </span>
            </BubbleReactions>
          </Bubble>
        </BubbleGroup>
      </Example>
      <Example title="Interactive content">
        <BubbleGroup className="w-full max-w-md">
          <ReactionBubble />
          <Bubble variant="outline" align="end">
            <BubbleContent render={<a href="#/ui/bubble" />}>
              Open the bubble docs
            </BubbleContent>
          </Bubble>
        </BubbleGroup>
      </Example>
    </div>
  )
}
