"use client"

import { useState } from "react"
import { Bell, KeyRound, Plug, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SettingsPanel() {
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [smsAlerts, setSmsAlerts] = useState(false)
  const [criticalOnly, setCriticalOnly] = useState(true)
  const [weeklyDigest, setWeeklyDigest] = useState(true)
  const [mfaEnabled, setMfaEnabled] = useState(true)
  const [apiAccess, setApiAccess] = useState(false)

  return (
    <Tabs defaultValue="general" className="gap-6">
      <TabsList>
        <TabsTrigger value="general">
          <User data-icon="inline-start" />
          General
        </TabsTrigger>
        <TabsTrigger value="notifications">
          <Bell data-icon="inline-start" />
          Notifications
        </TabsTrigger>
        <TabsTrigger value="integrations">
          <Plug data-icon="inline-start" />
          Integrations
        </TabsTrigger>
        <TabsTrigger value="security">
          <KeyRound data-icon="inline-start" />
          Security
        </TabsTrigger>
      </TabsList>

      <TabsContent value="general">
        <Card className="border-border/60 bg-card/60">
          <CardHeader>
            <CardTitle className="text-base">Profile & Preferences</CardTitle>
            <CardDescription>Manage your account details and display settings.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" defaultValue="Ava Ellison" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Work email</Label>
              <Input id="email" type="email" defaultValue="ava.ellison@industrialbrain.ai" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" defaultValue="Reliability Engineer" />
            </div>
            <div className="grid gap-2">
              <Label>Default plant</Label>
              <Select defaultValue="plant-1">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="plant-1">Plant 1 · Hall B</SelectItem>
                    <SelectItem value="plant-2">Plant 2 · Utilities</SelectItem>
                    <SelectItem value="warehouse">Warehouse East</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2 sm:col-span-2">
              <Label>Timezone</Label>
              <Select defaultValue="ist">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="ist">Asia/Kolkata (IST)</SelectItem>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="est">America/New_York (EST)</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        <Card className="border-border/60 bg-card/60">
          <CardHeader>
            <CardTitle className="text-base">Alert Channels</CardTitle>
            <CardDescription>Choose how you receive maintenance and compliance notifications.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {[
              { label: "Email alerts", desc: "Work order updates and AI recommendations", checked: emailAlerts, onChange: setEmailAlerts },
              { label: "SMS for critical events", desc: "Immediate notification for critical asset failures", checked: smsAlerts, onChange: setSmsAlerts },
              { label: "Critical-only filter", desc: "Suppress low and medium severity notifications", checked: criticalOnly, onChange: setCriticalOnly },
              { label: "Weekly operations digest", desc: "Summary of uptime, incidents and savings", checked: weeklyDigest, onChange: setWeeklyDigest },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-4 rounded-lg border border-border/60 bg-background/40 p-4">
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Switch checked={item.checked} onCheckedChange={item.onChange} />
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="integrations">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { name: "SAP PM", status: "Connected", detail: "Syncing work orders every 15 min" },
            { name: "OSIsoft PI", status: "Connected", detail: "12,400 tags streaming live" },
            { name: "ServiceNow", status: "Pending", detail: "Awaiting API key approval" },
            { name: "Microsoft Teams", status: "Disconnected", detail: "Enable incident channel alerts" },
          ].map((integration) => (
            <Card key={integration.name} className="border-border/60 bg-card/60">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{integration.name}</CardTitle>
                  <span
                    className={
                      integration.status === "Connected"
                        ? "rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-400"
                        : integration.status === "Pending"
                          ? "rounded-full bg-accent/15 px-2 py-0.5 text-xs font-medium text-accent"
                          : "rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
                    }
                  >
                    {integration.status}
                  </span>
                </div>
                <CardDescription>{integration.detail}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm">
                  {integration.status === "Connected" ? "Configure" : "Connect"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="security">
        <Card className="border-border/60 bg-card/60">
          <CardHeader>
            <CardTitle className="text-base">Security & Access</CardTitle>
            <CardDescription>Authentication, API keys and session controls.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4 rounded-lg border border-border/60 bg-background/40 p-4">
              <div>
                <p className="text-sm font-medium">Multi-factor authentication</p>
                <p className="text-xs text-muted-foreground">Required for all admin actions</p>
              </div>
              <Switch checked={mfaEnabled} onCheckedChange={setMfaEnabled} />
            </div>
            <div className="flex items-center justify-between gap-4 rounded-lg border border-border/60 bg-background/40 p-4">
              <div>
                <p className="text-sm font-medium">API access</p>
                <p className="text-xs text-muted-foreground">Allow programmatic access to asset data</p>
              </div>
              <Switch checked={apiAccess} onCheckedChange={setApiAccess} />
            </div>
            <Separator />
            <div className="grid gap-2">
              <Label htmlFor="api-key">API key</Label>
              <Input id="api-key" readOnly value="ib_live_••••••••••••4f2a" className="font-mono" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Rotate key</Button>
              <Button variant="outline" size="sm">View audit log</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
