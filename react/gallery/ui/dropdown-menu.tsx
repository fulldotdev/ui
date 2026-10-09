import * as React from "react"
import {
  CreditCardIcon,
  LogOutIcon,
  MailIcon,
  MessageSquareIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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

const sides = ["top", "right", "bottom", "left"] as const

export default function Demo() {
  const [showStatusBar, setShowStatusBar] = React.useState(true)
  const [showPanel, setShowPanel] = React.useState(false)
  const [position, setPosition] = React.useState("bottom")

  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Icons, shortcuts, submenu and destructive item">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>
            My account
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>My account</DropdownMenuLabel>
              <DropdownMenuItem>
                <UserIcon />
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCardIcon />
                Billing
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SettingsIcon />
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <MailIcon />
                      Email
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageSquareIcon />
                      Message
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More options</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem disabled>API (disabled)</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <LogOutIcon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Example>
      <Example title="Checkbox items">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>
            View
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Appearance</DropdownMenuLabel>
              <DropdownMenuCheckboxItem
                checked={showStatusBar}
                onCheckedChange={setShowStatusBar}
              >
                Status bar
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showPanel}
                onCheckedChange={setShowPanel}
              >
                Panel
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem disabled>
                Activity bar
              </DropdownMenuCheckboxItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </Example>
      <Example title="Radio items">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>
            Panel position: {position}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Panel position</DropdownMenuLabel>
              <DropdownMenuRadioGroup
                value={position}
                onValueChange={setPosition}
              >
                <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="bottom">
                  Bottom
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="right">
                  Right
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </Example>
      <Example title="Inset">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>
            Inset
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuGroup>
              <DropdownMenuLabel inset>Edit</DropdownMenuLabel>
              <DropdownMenuItem inset>Undo</DropdownMenuItem>
              <DropdownMenuItem inset>Redo</DropdownMenuItem>
              <DropdownMenuCheckboxItem defaultChecked>
                Word wrap
              </DropdownMenuCheckboxItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </Example>
      <Example title="Sides">
        {sides.map((side) => (
          <DropdownMenu key={side}>
            <DropdownMenuTrigger
              render={<Button variant="outline" className="capitalize" />}
            >
              {side}
            </DropdownMenuTrigger>
            <DropdownMenuContent side={side} className="w-40">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
      </Example>
    </div>
  )
}
