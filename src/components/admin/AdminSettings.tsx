
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

export const AdminSettings = () => {
  return (
    <Tabs defaultValue="general" className="space-y-4">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="appearance">Appearance</TabsTrigger>
        <TabsTrigger value="advanced">Advanced</TabsTrigger>
      </TabsList>
      
      <TabsContent value="general" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Site Information</CardTitle>
            <CardDescription>
              Update your site's basic information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="site-name" className="text-sm font-medium">Site Name</label>
                <Input id="site-name" defaultValue="Alumni Network" />
              </div>
              <div className="space-y-2">
                <label htmlFor="site-url" className="text-sm font-medium">Site URL</label>
                <Input id="site-url" defaultValue="https://alumni.university.edu" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="site-description" className="text-sm font-medium">Site Description</label>
              <Textarea 
                id="site-description" 
                defaultValue="Connect with fellow alumni, discover events, find job opportunities, and grow your professional network."
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="contact-email" className="text-sm font-medium">Contact Email</label>
              <Input id="contact-email" defaultValue="alumni@university.edu" />
            </div>
            
            <Button>Save Changes</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Registration Settings</CardTitle>
            <CardDescription>
              Control how new users register and join the alumni network.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <label className="text-sm font-medium">Allow New Registrations</label>
                <p className="text-xs text-muted-foreground">
                  Enable or disable new user registration.
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <label className="text-sm font-medium">Require Admin Approval</label>
                <p className="text-xs text-muted-foreground">
                  New accounts require administrator approval before activation.
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="allowed-domains" className="text-sm font-medium">Allowed Email Domains</label>
              <Input id="allowed-domains" defaultValue="university.edu" />
              <p className="text-xs text-muted-foreground">
                Comma-separated list of allowed email domains for registration.
              </p>
            </div>
            
            <Button>Save Changes</Button>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="security" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>
              Configure security options for your alumni network.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <label className="text-sm font-medium">Enable Two-Factor Authentication</label>
                <p className="text-xs text-muted-foreground">
                  Require two-factor authentication for all admin accounts.
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <label className="text-sm font-medium">Account Lockout</label>
                <p className="text-xs text-muted-foreground">
                  Lock accounts after multiple failed login attempts.
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="max-attempts" className="text-sm font-medium">Maximum Login Attempts</label>
              <Input id="max-attempts" type="number" defaultValue="5" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="session-timeout" className="text-sm font-medium">Session Timeout (minutes)</label>
              <Input id="session-timeout" type="number" defaultValue="30" />
            </div>
            
            <Button>Save Security Settings</Button>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="appearance" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Appearance Settings</CardTitle>
            <CardDescription>
              Customize the look and feel of your alumni network.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Theme Colors</label>
              <div className="grid grid-cols-5 gap-2">
                <div className="space-y-1.5">
                  <div className="w-full h-10 rounded-md bg-primary"></div>
                  <p className="text-xs text-center">Primary</p>
                </div>
                <div className="space-y-1.5">
                  <div className="w-full h-10 rounded-md bg-secondary"></div>
                  <p className="text-xs text-center">Secondary</p>
                </div>
                <div className="space-y-1.5">
                  <div className="w-full h-10 rounded-md bg-accent"></div>
                  <p className="text-xs text-center">Accent</p>
                </div>
                <div className="space-y-1.5">
                  <div className="w-full h-10 rounded-md bg-background"></div>
                  <p className="text-xs text-center">Background</p>
                </div>
                <div className="space-y-1.5">
                  <div className="w-full h-10 rounded-md bg-muted"></div>
                  <p className="text-xs text-center">Muted</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="logo-upload" className="text-sm font-medium">Logo Upload</label>
              <Input id="logo-upload" type="file" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="favicon-upload" className="text-sm font-medium">Favicon Upload</label>
              <Input id="favicon-upload" type="file" />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <label className="text-sm font-medium">Dark Mode Support</label>
                <p className="text-xs text-muted-foreground">
                  Enable dark mode toggle for users.
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Button>Save Appearance Settings</Button>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="advanced" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Advanced Settings</CardTitle>
            <CardDescription>
              Configure advanced options for your alumni network.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">System Logs</label>
              <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                <pre className="text-xs">
                  {`[2023-06-10 14:32:15] User login: admin@university.edu
[2023-06-10 14:30:22] System backup completed successfully
[2023-06-10 13:45:18] New user registered: john.doe@university.edu
[2023-06-10 12:30:05] Job posting created: Software Engineer at Google
[2023-06-10 11:15:42] Event created: Annual Alumni Networking
[2023-06-10 10:22:31] User profile updated: jane.smith@university.edu
[2023-06-09 18:45:12] System maintenance completed
[2023-06-09 16:30:08] Database optimization completed
[2023-06-09 15:12:25] API error: Rate limit exceeded
[2023-06-09 14:05:31] New community created: Computer Science Alumni`}
                </pre>
              </ScrollArea>
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <label className="text-sm font-medium">Maintenance Mode</label>
                <p className="text-xs text-muted-foreground">
                  Enable maintenance mode to temporarily disable the site.
                </p>
              </div>
              <Switch />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="cache-lifetime" className="text-sm font-medium">Cache Lifetime (minutes)</label>
              <Input id="cache-lifetime" type="number" defaultValue="60" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Database Management</label>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">Backup Database</Button>
                <Button variant="outline" size="sm">Optimize Tables</Button>
                <Button variant="outline" size="sm" className="text-red-500 hover:text-red-500">Clear Cache</Button>
              </div>
            </div>
            
            <Button>Save Advanced Settings</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
