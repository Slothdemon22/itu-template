"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Save, Bell, Eye, Lock, Globe, Moon, Sun } from "lucide-react"
import { toast } from "sonner"

export default function SettingsPanel() {
  const [loading, setLoading] = useState(false)
  const [settings, setSettings] = useState({
    displayName: "John Doe",
    email: "john.doe@example.com",
    notifications: {
      email: true,
      push: true,
      marketing: false,
    },
    privacy: {
      profileVisibility: "public",
      showActivity: true,
      allowComments: true,
    },
    appearance: {
      theme: "system",
      fontSize: "medium",
      animations: true,
    },
  })

  const handleSave = (section: string) => {
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      toast.success(`${section} settings saved successfully!`)
    }, 1000)
  }

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Settings</h2>
        <p className="text-muted-foreground">Manage your account preferences and settings</p>
      </div>

      <Tabs defaultValue="account" className="space-y-8">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account details and public profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  value={settings.displayName}
                  onChange={(e) => setSettings({ ...settings, displayName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSave("Account")} disabled={loading} className="flex items-center gap-2">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save Changes
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Control your profile visibility and privacy options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="profileVisibility">Profile Visibility</Label>
                <select
                  id="profileVisibility"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={settings.privacy.profileVisibility}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      privacy: { ...settings.privacy, profileVisibility: e.target.value },
                    })
                  }
                >
                  <option value="public">Public</option>
                  <option value="followers">Followers Only</option>
                  <option value="private">Private</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="showActivity">Show Activity Status</Label>
                  <p className="text-sm text-muted-foreground">Allow others to see when you're active</p>
                </div>
                <Switch
                  id="showActivity"
                  checked={settings.privacy.showActivity}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      privacy: { ...settings.privacy, showActivity: checked },
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="allowComments">Allow Comments</Label>
                  <p className="text-sm text-muted-foreground">Let others comment on your cards</p>
                </div>
                <Switch
                  id="allowComments"
                  checked={settings.privacy.allowComments}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      privacy: { ...settings.privacy, allowComments: checked },
                    })
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleSave("Privacy")}
                disabled={loading}
                variant="outline"
                className="flex items-center gap-2"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
                Update Privacy
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how and when you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={settings.notifications.email}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, email: checked },
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="pushNotifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                </div>
                <Switch
                  id="pushNotifications"
                  checked={settings.notifications.push}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, push: checked },
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketingNotifications">Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">Receive updates about new features</p>
                </div>
                <Switch
                  id="marketingNotifications"
                  checked={settings.notifications.marketing}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, marketing: checked },
                    })
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleSave("Notification")}
                disabled={loading}
                variant="outline"
                className="flex items-center gap-2"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Bell className="h-4 w-4" />}
                Update Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize how the application looks and feels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: "light", label: "Light", icon: <Sun className="h-5 w-5" /> },
                    { value: "dark", label: "Dark", icon: <Moon className="h-5 w-5" /> },
                    { value: "system", label: "System", icon: <Globe className="h-5 w-5" /> },
                  ].map((theme) => (
                    <div
                      key={theme.value}
                      className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        settings.appearance.theme === theme.value
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() =>
                        setSettings({
                          ...settings,
                          appearance: { ...settings.appearance, theme: theme.value },
                        })
                      }
                    >
                      {theme.icon}
                      <span className="mt-2 text-sm font-medium">{theme.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fontSize">Font Size</Label>
                <select
                  id="fontSize"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={settings.appearance.fontSize}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      appearance: { ...settings.appearance, fontSize: e.target.value },
                    })
                  }
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="animations">Enable Animations</Label>
                  <p className="text-sm text-muted-foreground">Show animations throughout the interface</p>
                </div>
                <Switch
                  id="animations"
                  checked={settings.appearance.animations}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      appearance: { ...settings.appearance, animations: checked },
                    })
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleSave("Appearance")}
                disabled={loading}
                variant="outline"
                className="flex items-center gap-2"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Eye className="h-4 w-4" />}
                Save Appearance
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
