import * as React from "react"
import {
  CheckIcon,
  ChevronRightIcon,
  CircleUserIcon,
  ClockIcon,
  FileTextIcon,
  GitBranchIcon,
  SearchIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Marker,
  MarkerContent,
  MarkerIcon,
  markerVariants,
} from "@/components/ui/marker"
import { Spinner } from "@/components/ui/spinner"

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
  const [clicks, setClicks] = React.useState(0)

  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Default">
        <div className="flex w-full max-w-md flex-col gap-6">
          <Marker>
            <MarkerContent>A default marker</MarkerContent>
          </Marker>
          <Marker>
            <MarkerIcon>
              <FileTextIcon />
            </MarkerIcon>
            <MarkerContent>Marker with an icon</MarkerContent>
          </Marker>
          <Marker role="status">
            <MarkerIcon>
              <Spinner />
            </MarkerIcon>
            <MarkerContent>Thinking...</MarkerContent>
          </Marker>
          <Marker>
            <MarkerIcon>
              <CircleUserIcon />
            </MarkerIcon>
            <MarkerContent>Rhea joined the chat</MarkerContent>
          </Marker>
          <Marker className="justify-center">
            <MarkerContent>
              <strong className="font-medium">Olivia Rose</strong> left the chat
            </MarkerContent>
          </Marker>
        </div>
      </Example>

      <Example title="As a link and a button">
        <div className="flex w-full max-w-md flex-col gap-6">
          <Marker render={<a href="#/ui/marker" />}>
            <MarkerIcon>
              <GitBranchIcon />
            </MarkerIcon>
            <MarkerContent>Marker as a link</MarkerContent>
          </Marker>
          <Marker
            render={
              <button
                type="button"
                onClick={() => setClicks((count) => count + 1)}
                className="transition-colors hover:text-foreground"
              />
            }
          >
            <MarkerIcon>
              <ClockIcon />
            </MarkerIcon>
            <MarkerContent className="flex-1 text-start">
              Marker as a button, clicked {clicks} times
            </MarkerContent>
            <MarkerIcon>
              <ChevronRightIcon />
            </MarkerIcon>
          </Marker>
        </div>
      </Example>

      <Example title="Border">
        <div className="flex w-full max-w-md flex-col gap-3">
          <Marker variant="border">
            <MarkerIcon>
              <GitBranchIcon />
            </MarkerIcon>
            <MarkerContent>Switched to release-candidate</MarkerContent>
          </Marker>
          <Marker variant="border">
            <MarkerIcon>
              <SearchIcon />
            </MarkerIcon>
            <MarkerContent>Reviewed 8 related files</MarkerContent>
          </Marker>
        </div>
      </Example>

      <Example title="Separator">
        <div className="flex w-full max-w-md flex-col gap-6">
          <Marker variant="separator">
            <MarkerContent>Worked for 42s</MarkerContent>
          </Marker>
          <Marker variant="separator" role="status">
            <MarkerIcon>
              <Spinner />
            </MarkerIcon>
            <MarkerContent>Compacting conversation</MarkerContent>
          </Marker>
          <Marker variant="separator">
            <MarkerIcon>
              <CheckIcon />
            </MarkerIcon>
            <MarkerContent>Conversation compacted</MarkerContent>
          </Marker>
          <Marker variant="separator">
            <MarkerContent>
              <Button variant="outline" size="sm">
                <SearchIcon data-icon="inline-start" />
                Explored 4 files
              </Button>
            </MarkerContent>
          </Marker>
        </div>
      </Example>

      <Example title="markerVariants on another element">
        <ul className="flex w-full max-w-md flex-col gap-3">
          <li className={markerVariants({ variant: "border" })}>
            <MarkerIcon>
              <FileTextIcon />
            </MarkerIcon>
            <MarkerContent>Opened implementation notes</MarkerContent>
          </li>
        </ul>
      </Example>
    </div>
  )
}
