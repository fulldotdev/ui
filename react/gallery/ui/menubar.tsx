import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { LogOutIcon, SettingsIcon, UserIcon } from "lucide-react"

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"

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
  const [bookmarks, setBookmarks] = React.useState(true)
  const [fullUrls, setFullUrls] = React.useState(false)
  const [profile, setProfile] = React.useState("andy")

  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Application menu">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarGroup>
                <MenubarItem>
                  New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  New Window <MenubarShortcut>⌘N</MenubarShortcut>
                </MenubarItem>
                <MenubarItem disabled>New Incognito Window</MenubarItem>
              </MenubarGroup>
              <MenubarSeparator />
              <MenubarSub>
                <MenubarSubTrigger>Share</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Email link</MenubarItem>
                  <MenubarItem>Messages</MenubarItem>
                  <MenubarItem>Notes</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSeparator />
              <MenubarItem>
                Print... <MenubarShortcut>⌘P</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                Undo <MenubarShortcut>⌘Z</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem inset>Cut</MenubarItem>
              <MenubarItem inset>Copy</MenubarItem>
              <MenubarItem inset>Paste</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              <MenubarCheckboxItem
                checked={bookmarks}
                onCheckedChange={setBookmarks}
              >
                Show Bookmarks Bar
              </MenubarCheckboxItem>
              <MenubarCheckboxItem
                checked={fullUrls}
                onCheckedChange={setFullUrls}
              >
                Always Show Full URLs
              </MenubarCheckboxItem>
              <MenubarSeparator />
              <MenubarItem inset>
                Reload <MenubarShortcut>⌘R</MenubarShortcut>
              </MenubarItem>
              <MenubarItem inset disabled>
                Force Reload
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Profiles</MenubarTrigger>
            <MenubarContent>
              <MenubarGroup>
                <MenubarLabel inset>Switch profile</MenubarLabel>
                <MenubarRadioGroup value={profile} onValueChange={setProfile}>
                  <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
                  <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
                  <MenubarRadioItem value="luis">Luis</MenubarRadioItem>
                </MenubarRadioGroup>
              </MenubarGroup>
              <MenubarSeparator />
              <MenubarItem inset>Edit profiles</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <p className="text-sm text-muted-foreground">
          Bookmarks bar {bookmarks ? "shown" : "hidden"}, full URLs{" "}
          {fullUrls ? "on" : "off"}, profile {profile}.
        </p>
      </Example>

      <Example title="Icons and destructive item">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>Account</MenubarTrigger>
            <MenubarContent>
              <MenubarLabel>My account</MenubarLabel>
              <MenubarItem>
                <UserIcon />
                Profile
              </MenubarItem>
              <MenubarItem>
                <SettingsIcon />
                Settings
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem variant="destructive">
                <LogOutIcon />
                Sign out
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </Example>

      <Example title="Disabled">
        <Menubar disabled>
          <MenubarMenu>
            <MenubarTrigger>Locked</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Unavailable</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Menus</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Unavailable</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </Example>

      <Example title="Portal with a custom popup">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>Help</MenubarTrigger>
            <MenubarPortal>
              <MenuPrimitive.Positioner
                className="isolate z-50 outline-none"
                align="start"
                sideOffset={8}
              >
                <MenuPrimitive.Popup className="min-w-48 rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none">
                  <MenubarItem>Documentation</MenubarItem>
                  <MenubarItem>Keyboard shortcuts</MenubarItem>
                </MenuPrimitive.Popup>
              </MenuPrimitive.Positioner>
            </MenubarPortal>
          </MenubarMenu>
        </Menubar>
      </Example>
    </div>
  )
}
