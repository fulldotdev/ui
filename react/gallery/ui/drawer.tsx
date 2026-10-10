import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerIndent,
  DrawerIndentBackground,
  DrawerOverlay,
  DrawerPopup,
  DrawerPortal,
  DrawerProvider,
  DrawerSwipeHandle,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport,
  DrawerVirtualKeyboardProvider,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"

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

const sides = ["down", "up", "left", "right"] as const
const snapPoints = ["20rem", 1]

function Placeholder() {
  return (
    <div className="flex-1 p-4">
      <div className="rounded-md bg-muted group-data-[swipe-axis=x]/drawer-popup:size-full group-data-[swipe-axis=y]/drawer-popup:h-40 group-data-[swipe-axis=y]/drawer-popup:w-full" />
    </div>
  )
}

export default function Demo() {
  const [open, setOpen] = React.useState(false)
  const [goal, setGoal] = React.useState(350)

  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Header and footer">
        <Drawer>
          <DrawerTrigger render={<Button variant="outline" />}>
            Open drawer
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto flex w-full max-w-sm flex-col">
              <DrawerHeader>
                <DrawerTitle>Move goal</DrawerTitle>
                <DrawerDescription>
                  Set your daily activity goal.
                </DrawerDescription>
              </DrawerHeader>
              <div className="flex items-center justify-center gap-4 p-4">
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Decrease goal"
                  onClick={() => setGoal((value) => Math.max(200, value - 10))}
                  disabled={goal <= 200}
                >
                  -
                </Button>
                <div className="text-center">
                  <div className="text-5xl font-bold tracking-tight">
                    {goal}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase">
                    Calories per day
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Increase goal"
                  onClick={() => setGoal((value) => Math.min(400, value + 10))}
                  disabled={goal >= 400}
                >
                  +
                </Button>
              </div>
              <DrawerFooter>
                <DrawerClose render={<Button />}>Submit</DrawerClose>
                <DrawerClose render={<Button variant="outline" />}>
                  Cancel
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </Example>
      <Example title="Directions with swipe handle">
        {sides.map((side) => (
          <Drawer key={side} swipeDirection={side} showSwipeHandle>
            <DrawerTrigger
              render={<Button variant="outline" className="capitalize" />}
            >
              {side}
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Swipe {side}</DrawerTitle>
                <DrawerDescription>
                  Swipe {side} or press Escape to close.
                </DrawerDescription>
              </DrawerHeader>
              <Placeholder />
              <DrawerFooter>
                <DrawerClose render={<Button variant="outline" />}>
                  Close
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        ))}
      </Example>
      <Example title="Snap points">
        <Drawer snapPoints={snapPoints}>
          <DrawerTrigger render={<Button variant="outline" />}>
            Open snap drawer
          </DrawerTrigger>
          <DrawerContent>
            <DrawerSwipeHandle />
            <DrawerHeader>
              <DrawerTitle>Snap points</DrawerTitle>
              <DrawerDescription>
                Drag between a compact peek and the full height.
              </DrawerDescription>
            </DrawerHeader>
            <div className="grid flex-1 gap-3 overflow-y-auto p-4">
              {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="h-12 rounded-md bg-muted" />
              ))}
            </div>
          </DrawerContent>
        </Drawer>
      </Example>
      <Example title="Controlled and nested">
        <div className="flex flex-col gap-2">
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger
              render={<Button variant="outline" className="w-fit" />}
            >
              Open settings
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Settings</DrawerTitle>
                <DrawerDescription>
                  Open a second drawer on top of this one.
                </DrawerDescription>
              </DrawerHeader>
              <Placeholder />
              <DrawerFooter>
                <Drawer>
                  <DrawerTrigger render={<Button />}>Advanced</DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Advanced settings</DrawerTitle>
                      <DrawerDescription>
                        The settings drawer stays mounted behind this one.
                      </DrawerDescription>
                    </DrawerHeader>
                    <Placeholder />
                    <DrawerFooter>
                      <DrawerClose render={<Button variant="outline" />}>
                        Back
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Close
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
          <p className="text-sm text-muted-foreground">
            Settings drawer is {open ? "open" : "closed"}.
          </p>
        </div>
      </Example>
      <Example title="Custom overlay with portal">
        <Drawer modal="trap-focus" swipeDirection="right">
          <DrawerTrigger render={<Button variant="outline" />}>
            Blurred overlay
          </DrawerTrigger>
          <DrawerPortal>
            <DrawerOverlay className="backdrop-blur-sm" />
          </DrawerPortal>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Custom overlay</DrawerTitle>
              <DrawerDescription>
                This drawer renders its own blurred overlay through the drawer
                portal.
              </DrawerDescription>
            </DrawerHeader>
            <Placeholder />
            <DrawerFooter>
              <DrawerClose render={<Button variant="outline" />}>
                Close
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Example>
      <Example title="Long content scrolls">
        <Drawer>
          <DrawerTrigger render={<Button variant="outline" />}>
            Release notes
          </DrawerTrigger>
          <DrawerContent data-testid="drawer-long">
            <DrawerHeader>
              <DrawerTitle>Release notes</DrawerTitle>
              <DrawerDescription>
                Every change in this release, newest first.
              </DrawerDescription>
            </DrawerHeader>
            <ol className="flex flex-col gap-2 px-4 text-sm">
              {Array.from({ length: 40 }, (_, index) => (
                <li key={index}>Change {40 - index}: small improvements.</li>
              ))}
            </ol>
            <DrawerFooter>
              <DrawerClose render={<Button variant="outline" />}>
                Close
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Example>
      <Example title="Composed from parts, with an indented page">
        <DrawerProvider>
          <div className="relative w-full max-w-md overflow-hidden rounded-xl border">
            <DrawerIndentBackground className="absolute inset-0 bg-foreground" />
            <DrawerIndent className="relative flex flex-col gap-3 bg-background p-4 transition-[transform,border-radius] duration-300 data-active:scale-95 data-active:rounded-xl">
              <p className="text-sm text-muted-foreground">
                The page scales back while the drawer is open.
              </p>
              <Drawer>
                <DrawerTrigger render={<Button variant="outline" />}>
                  Leave a note
                </DrawerTrigger>
                <DrawerPortal>
                  <DrawerOverlay />
                  <DrawerViewport>
                    <DrawerVirtualKeyboardProvider>
                      <DrawerPopup>
                        <DrawerSwipeHandle />
                        <DrawerHeader>
                          <DrawerTitle>Leave a note</DrawerTitle>
                          <DrawerDescription>
                            The field stays above the on-screen keyboard.
                          </DrawerDescription>
                        </DrawerHeader>
                        <div className="px-4">
                          <Input aria-label="Note" placeholder="Your note" />
                        </div>
                        <DrawerFooter>
                          <DrawerClose render={<Button variant="outline" />}>
                            Done
                          </DrawerClose>
                        </DrawerFooter>
                      </DrawerPopup>
                    </DrawerVirtualKeyboardProvider>
                  </DrawerViewport>
                </DrawerPortal>
              </Drawer>
            </DrawerIndent>
          </div>
        </DrawerProvider>
      </Example>
      <Example title="Non modal">
        <Drawer modal={false} disablePointerDismissal swipeDirection="right">
          <DrawerTrigger render={<Button variant="outline" />}>
            Non modal
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Non modal drawer</DrawerTitle>
              <DrawerDescription>
                The page behind stays interactive.
              </DrawerDescription>
            </DrawerHeader>
            <Placeholder />
            <DrawerFooter>
              <DrawerClose render={<Button variant="outline" />}>
                Close
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Example>
    </div>
  )
}
