
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Settings, Monitor, Bell, Lock, PaintBucket, Server } from "lucide-react";

const SettingsPage = () => {
  const [theme, setTheme] = useState("system");
  const [notifications, setNotifications] = useState(true);
  const [connSecurity, setConnSecurity] = useState("high");
  const [connSpeed, setConnSpeed] = useState("balanced");
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [proxyEnabled, setProxyEnabled] = useState(false);
  const [proxyServer, setProxyServer] = useState("");
  const [proxyPort, setProxyPort] = useState("");

  const handleSaveGeneral = () => {
    toast({
      title: "Settings saved",
      description: "Your general settings have been updated.",
    });
  };

  const handleSaveAppearance = () => {
    toast({
      title: "Appearance settings saved",
      description: "Your appearance settings have been updated.",
    });
  };

  const handleSaveConnection = () => {
    toast({
      title: "Connection settings saved",
      description: "Your connection settings have been updated.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification settings saved",
      description: "Your notification settings have been updated.",
    });
  };

  return (
    <div className="container mx-auto py-10 max-w-5xl">
      <div className="flex items-center mb-8">
        <Settings className="h-8 w-8 mr-2 text-primary" />
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-6 grid grid-cols-4 md:grid-cols-5 lg:flex">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden md:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <PaintBucket className="h-4 w-4" />
            <span className="hidden md:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="connection" className="flex items-center gap-2">
            <Monitor className="h-4 w-4" />
            <span className="hidden md:inline">Connection</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden md:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden md:inline">Security</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure the general settings for your remote connection application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Automatic Updates</h3>
                  <p className="text-sm text-muted-foreground">
                    Automatically download and install updates when available
                  </p>
                </div>
                <Switch 
                  checked={autoUpdate} 
                  onCheckedChange={setAutoUpdate} 
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="pt">Portuguese</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="startup">Start on system startup</Label>
                <Select defaultValue="minimized">
                  <SelectTrigger id="startup">
                    <SelectValue placeholder="Select behavior" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">Don't start</SelectItem>
                    <SelectItem value="minimized">Start minimized</SelectItem>
                    <SelectItem value="normal">Start normally</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveGeneral}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize the look and feel of your application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Theme</Label>
                <RadioGroup 
                  value={theme} 
                  onValueChange={setTheme}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="theme-light" />
                    <Label htmlFor="theme-light">Light</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="theme-dark" />
                    <Label htmlFor="theme-dark">Dark</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="theme-system" />
                    <Label htmlFor="theme-system">System default</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Compact Mode</h3>
                  <p className="text-sm text-muted-foreground">
                    Use less space for the interface elements
                  </p>
                </div>
                <Switch defaultChecked={false} />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="font-size">Font Size</Label>
                <Select defaultValue="medium">
                  <SelectTrigger id="font-size">
                    <SelectValue placeholder="Select font size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveAppearance}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Connection Settings */}
        <TabsContent value="connection">
          <Card>
            <CardHeader>
              <CardTitle>Connection Settings</CardTitle>
              <CardDescription>
                Configure how your remote connections are established and managed.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Connection Security Level</Label>
                <RadioGroup 
                  value={connSecurity} 
                  onValueChange={setConnSecurity}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="security-high" />
                    <Label htmlFor="security-high">High (AES-256)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="security-medium" />
                    <Label htmlFor="security-medium">Medium (AES-128)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="standard" id="security-standard" />
                    <Label htmlFor="security-standard">Standard</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>Connection Speed Optimization</Label>
                <RadioGroup 
                  value={connSpeed} 
                  onValueChange={setConnSpeed}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="quality" id="speed-quality" />
                    <Label htmlFor="speed-quality">Best Quality</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="balanced" id="speed-balanced" />
                    <Label htmlFor="speed-balanced">Balanced</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="performance" id="speed-performance" />
                    <Label htmlFor="speed-performance">Best Performance</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-medium">Proxy Settings</h3>
                    <p className="text-sm text-muted-foreground">
                      Use a proxy server for connections
                    </p>
                  </div>
                  <Switch 
                    checked={proxyEnabled} 
                    onCheckedChange={setProxyEnabled} 
                  />
                </div>
                
                {proxyEnabled && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="proxy-server">Proxy Server</Label>
                      <Input 
                        id="proxy-server" 
                        placeholder="proxy.example.com" 
                        value={proxyServer}
                        onChange={(e) => setProxyServer(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="proxy-port">Port</Label>
                      <Input 
                        id="proxy-port" 
                        placeholder="8080" 
                        value={proxyPort}
                        onChange={(e) => setProxyPort(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveConnection}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Enable Notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about connections and events
                  </p>
                </div>
                <Switch 
                  checked={notifications} 
                  onCheckedChange={setNotifications} 
                />
              </div>
              
              {notifications && (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-medium">Connection Established</h3>
                      <p className="text-sm text-muted-foreground">
                        Notify when a remote connection is established
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-medium">Connection Lost</h3>
                      <p className="text-sm text-muted-foreground">
                        Notify when a remote connection is lost
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-medium">New Version Available</h3>
                      <p className="text-sm text-muted-foreground">
                        Notify when a new software version is available
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveNotifications}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your security and privacy settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Save Connection History</h3>
                  <p className="text-sm text-muted-foreground">
                    Keep a record of recent connections
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Clipboard Sharing</h3>
                  <p className="text-sm text-muted-foreground">
                    Allow clipboard sharing between local and remote devices
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="connection-timeout">Connection Timeout (minutes)</Label>
                <Select defaultValue="30">
                  <SelectTrigger id="connection-timeout">
                    <SelectValue placeholder="Select timeout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="never">Never timeout</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="pt-4">
                <Button variant="outline" className="w-full">
                  Reset All Security Settings
                </Button>
              </div>
              
              <div className="pt-2">
                <Button variant="destructive" className="w-full">
                  Clear All Saved Connection Data
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
