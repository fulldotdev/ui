import * as React from "react"

import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import { Marker, MarkerContent } from "@/components/ui/marker"
import { Message, MessageContent } from "@/components/ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
} from "@/components/ui/message-scroller"

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

type ChatMessage = { id: string; role: "user" | "assistant"; text: string }

const script: Omit<ChatMessage, "id">[] = [
  { role: "user", text: "Can you check why the checkout page is slow?" },
  {
    role: "assistant",
    text: "The product images are loaded at full size. Serving resized versions should cut the page weight by about two thirds.",
  },
  { role: "user", text: "Which images are the worst?" },
  {
    role: "assistant",
    text: "The hero banner and the three featured product photos. Together they are over 6 MB.",
  },
  { role: "user", text: "Can you resize them?" },
  {
    role: "assistant",
    text: "Done. I added responsive sizes and lazy loading for everything below the fold.",
  },
  { role: "user", text: "Anything else worth fixing?" },
  {
    role: "assistant",
    text: "The analytics script blocks rendering. Loading it after the page is interactive would help too.",
  },
]

const initialMessages: ChatMessage[] = script
  .slice(0, 6)
  .map((message, index) => ({ ...message, id: `message-${index + 1}` }))

function ScrollerControls() {
  const { scrollToStart, scrollToEnd, scrollToMessage } = useMessageScroller()
  const scrollable = useMessageScrollerScrollable()
  const { currentAnchorId, visibleMessageIds } = useMessageScrollerVisibility()

  return (
    <div className="flex flex-col gap-2 border-t p-3 text-xs text-muted-foreground">
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="xs"
          onClick={() => scrollToStart({ behavior: "smooth" })}
        >
          Scroll to start
        </Button>
        <Button
          variant="outline"
          size="xs"
          onClick={() => scrollToEnd({ behavior: "smooth" })}
        >
          Scroll to end
        </Button>
        <Button
          variant="outline"
          size="xs"
          onClick={() =>
            scrollToMessage("message-3", { align: "start", behavior: "smooth" })
          }
        >
          Jump to third message
        </Button>
      </div>
      <p>
        More above: {scrollable.start ? "yes" : "no"}, more below:{" "}
        {scrollable.end ? "yes" : "no"}
      </p>
      <p>
        Current anchor: {currentAnchorId ?? "none"}, visible:{" "}
        {visibleMessageIds.length}
      </p>
    </div>
  )
}

export default function Demo() {
  const [messages, setMessages] = React.useState(initialMessages)
  const next = script[messages.length]

  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Chat transcript">
        <MessageScrollerProvider autoScroll>
          <div className="flex h-[28rem] w-full max-w-md flex-col overflow-hidden rounded-lg border">
            <MessageScroller>
              <MessageScrollerViewport aria-label="Conversation">
                <MessageScrollerContent className="gap-4 p-4">
                  {messages.map((message) => (
                    <MessageScrollerItem
                      key={message.id}
                      messageId={message.id}
                      scrollAnchor={message.role === "user"}
                    >
                      <Message
                        align={message.role === "user" ? "end" : "start"}
                      >
                        <MessageContent>
                          <Bubble
                            variant={
                              message.role === "user" ? "default" : "muted"
                            }
                          >
                            <BubbleContent>{message.text}</BubbleContent>
                          </Bubble>
                        </MessageContent>
                      </Message>
                    </MessageScrollerItem>
                  ))}
                  {!next && (
                    <MessageScrollerItem>
                      <Marker variant="separator">
                        <MarkerContent>End of conversation</MarkerContent>
                      </Marker>
                    </MessageScrollerItem>
                  )}
                </MessageScrollerContent>
              </MessageScrollerViewport>
              <MessageScrollerButton direction="start" />
              <MessageScrollerButton />
            </MessageScroller>
            <ScrollerControls />
            <div className="border-t p-3">
              <Button
                size="sm"
                disabled={!next}
                onClick={() =>
                  setMessages((current) => [
                    ...current,
                    { ...next, id: `message-${current.length + 1}` },
                  ])
                }
              >
                {next ? "Add next message" : "No more messages"}
              </Button>
            </div>
          </div>
        </MessageScrollerProvider>
      </Example>
    </div>
  )
}
