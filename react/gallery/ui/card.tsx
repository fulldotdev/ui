import * as React from "react"
import { BellIcon } from "lucide-react"

import { placeholderImage } from "@/lib/placeholder-image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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

export default function Demo() {
  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Login form">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Log in to your account</CardTitle>
            <CardDescription>Enter your email below to log in.</CardDescription>
            <CardAction>
              <Button variant="link">Sign up</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="card-email">Email</Label>
                <Input
                  id="card-email"
                  type="email"
                  placeholder="you@example.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="card-password">Password</Label>
                <Input id="card-password" type="password" />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button className="w-full">Log in</Button>
            <Button variant="outline" className="w-full">
              Log in with a magic link
            </Button>
          </CardFooter>
        </Card>
      </Example>
      <Example title="Small size">
        <Card size="sm" className="w-full max-w-xs">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>You have 3 unread messages.</CardDescription>
            <CardAction>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Notification settings"
              >
                <BellIcon />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p>New reviews arrive here as soon as a customer posts one.</p>
          </CardContent>
          <CardFooter>
            <Button size="sm" variant="outline" className="w-full">
              Mark all as read
            </Button>
          </CardFooter>
        </Card>
      </Example>
      <Example title="With image">
        <Card className="w-full max-w-sm">
          <img
            src={placeholderImage.src}
            alt="Event venue"
            className="aspect-video w-full object-cover"
          />
          <CardHeader>
            <CardTitle>Design meetup</CardTitle>
            <CardDescription>Thursday 19:00, Utrecht</CardDescription>
            <CardAction>
              <Badge variant="secondary">Free</Badge>
            </CardAction>
          </CardHeader>
          <CardFooter>
            <Button className="w-full">Reserve a seat</Button>
          </CardFooter>
        </Card>
      </Example>
      <Example title="Content only">
        <Card className="w-full max-w-xs">
          <CardContent>
            <p className="text-2xl font-semibold tabular-nums">€12,450</p>
            <p className="text-muted-foreground">Revenue this month</p>
          </CardContent>
        </Card>
      </Example>
    </div>
  )
}
