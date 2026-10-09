import * as React from "react"

import { placeholderImage } from "@/lib/placeholder-image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/components/ui/message"

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
      <Example title="Alignment">
        <div className="flex w-full max-w-md min-w-0 flex-col gap-6">
          <Message align="end">
            <MessageContent>
              <Bubble>
                <BubbleContent>Deploying to production now.</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
          <Message>
            <MessageContent>
              <Bubble variant="muted">
                <BubbleContent>It is 4:55 PM on a Friday.</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
        </div>
      </Example>

      <Example title="Avatar">
        <div className="flex w-full max-w-md min-w-0 flex-col gap-6">
          <Message>
            <MessageAvatar>
              <Avatar>
                <AvatarImage src={placeholderImage.src} alt="Olivia Rose" />
                <AvatarFallback>OR</AvatarFallback>
              </Avatar>
            </MessageAvatar>
            <MessageContent>
              <Bubble variant="muted">
                <BubbleContent>Something went wrong. Any idea?</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
          <Message align="end">
            <MessageAvatar>
              <Avatar>
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
            </MessageAvatar>
            <MessageContent>
              <Bubble>
                <BubbleContent>
                  The build failed while installing dependencies.
                </BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
        </div>
      </Example>

      <Example title="Group">
        <div className="flex w-full max-w-md min-w-0 flex-col gap-6">
          <MessageGroup>
            <Message>
              <MessageContent>
                <Bubble variant="muted">
                  <BubbleContent>
                    I checked the registry addresses.
                  </BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
            <Message>
              <MessageContent>
                <Bubble variant="muted">
                  <BubbleContent>
                    The component files now live under the UI registry.
                  </BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
          </MessageGroup>
          <MessageGroup>
            <Message align="end">
              <MessageContent>
                <Bubble>
                  <BubbleContent>Great, thanks.</BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
            <Message align="end">
              <MessageContent>
                <Bubble>
                  <BubbleContent>I will publish the release.</BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
          </MessageGroup>
        </div>
      </Example>

      <Example title="Header and footer">
        <div className="flex w-full max-w-md min-w-0 flex-col gap-8">
          <Message align="end">
            <MessageContent>
              <MessageHeader className="justify-end">You</MessageHeader>
              <Bubble>
                <BubbleContent>Can we send the update today?</BubbleContent>
              </Bubble>
              <MessageFooter className="gap-2">
                <span>Delivered</span>
                <Button variant="ghost" size="xs">
                  Undo
                </Button>
              </MessageFooter>
            </MessageContent>
          </Message>
          <Message>
            <MessageContent>
              <MessageHeader>
                <span>Olivia</span>
                <span className="ml-auto font-normal">1m ago</span>
              </MessageHeader>
              <Bubble variant="muted">
                <BubbleContent>
                  The retry finished and the missing invoices are included now.
                </BubbleContent>
              </Bubble>
              <MessageFooter className="gap-2">
                <span>From the support queue</span>
                <Button variant="ghost" size="xs">
                  Copy
                </Button>
              </MessageFooter>
            </MessageContent>
          </Message>
        </div>
      </Example>
    </div>
  )
}
