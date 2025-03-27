import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const ProfilePage: React.FC = () => {
  return (
    <div className="flex-1 p-4 md:p-6">
      <h1 className="text-2xl font-semibold mb-6">Your Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-primary-light flex items-center justify-center text-white text-3xl mb-4">
                  <span className="material-icons text-4xl">person</span>
                </div>
                <h2 className="text-xl font-semibold">Guest User</h2>
                <p className="text-neutral-500 mt-1">guest@example.com</p>
                
                <div className="mt-6 w-full">
                  <Button className="w-full">Edit Profile</Button>
                </div>
                
                <div className="mt-6 border-t pt-6 w-full">
                  <h3 className="font-medium mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <button className="flex items-center text-sm text-neutral-700 hover:text-primary">
                      <span className="material-icons text-sm mr-2">history</span>
                      View Chat History
                    </button>
                    <button className="flex items-center text-sm text-neutral-700 hover:text-primary">
                      <span className="material-icons text-sm mr-2">bookmark</span>
                      Saved Resources
                    </button>
                    <button className="flex items-center text-sm text-neutral-700 hover:text-primary">
                      <span className="material-icons text-sm mr-2">settings</span>
                      Account Settings
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Tabs defaultValue="preferences" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="investment-profile">Investment Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            
            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>User Preferences</CardTitle>
                  <CardDescription>Customize your financial assistant experience</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Dark Mode</h4>
                        <p className="text-sm text-neutral-500">Switch to dark theme</p>
                      </div>
                      <Switch id="dark-mode" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Simplified Language</h4>
                        <p className="text-sm text-neutral-500">Use simple terms for financial concepts</p>
                      </div>
                      <Switch id="simplified-language" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Save Chat History</h4>
                        <p className="text-sm text-neutral-500">Store your conversations for future reference</p>
                      </div>
                      <Switch id="save-history" defaultChecked />
                    </div>
                    
                    <div className="pt-4">
                      <Label htmlFor="language">Language</Label>
                      <select 
                        id="language" 
                        className="mt-1 w-full rounded-md border border-neutral-300 p-2"
                      >
                        <option value="en">English</option>
                        <option value="hi">Hindi</option>
                        <option value="ta">Tamil</option>
                        <option value="te">Telugu</option>
                      </select>
                    </div>
                    
                    <Button className="mt-6">Save Preferences</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="investment-profile">
              <Card>
                <CardHeader>
                  <CardTitle>Investment Profile</CardTitle>
                  <CardDescription>Set your investment preferences for better recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="risk-tolerance">Risk Tolerance</Label>
                      <select 
                        id="risk-tolerance" 
                        className="mt-1 w-full rounded-md border border-neutral-300 p-2"
                      >
                        <option value="conservative">Conservative</option>
                        <option value="moderate">Moderate</option>
                        <option value="aggressive">Aggressive</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="investment-horizon">Investment Horizon</Label>
                      <select 
                        id="investment-horizon" 
                        className="mt-1 w-full rounded-md border border-neutral-300 p-2"
                      >
                        <option value="short">Short Term (0-3 years)</option>
                        <option value="medium">Medium Term (3-7 years)</option>
                        <option value="long">Long Term (7+ years)</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="monthly-investment">Monthly Investment Capacity</Label>
                      <Input 
                        id="monthly-investment" 
                        type="number" 
                        placeholder="e.g. 5000" 
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label>Investment Interests</Label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" className="rounded-full">Mutual Funds</Button>
                        <Button variant="outline" size="sm" className="rounded-full">Stocks</Button>
                        <Button variant="outline" size="sm" className="rounded-full">Fixed Deposits</Button>
                        <Button variant="outline" size="sm" className="rounded-full">Gold</Button>
                        <Button variant="outline" size="sm" className="rounded-full">Real Estate</Button>
                      </div>
                    </div>
                    
                    <Button className="mt-6">Update Profile</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Manage how you receive updates and alerts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Market Updates</h4>
                        <p className="text-sm text-neutral-500">Daily market summary and highlights</p>
                      </div>
                      <Switch id="market-updates" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Educational Content</h4>
                        <p className="text-sm text-neutral-500">New courses and learning materials</p>
                      </div>
                      <Switch id="educational-content" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Investment Opportunities</h4>
                        <p className="text-sm text-neutral-500">New investment products and recommendations</p>
                      </div>
                      <Switch id="investment-opportunities" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Mobile Notifications</h4>
                        <p className="text-sm text-neutral-500">Push notifications on your mobile device</p>
                      </div>
                      <Switch id="mobile-notifications" defaultChecked />
                    </div>
                    
                    <Button className="mt-6">Save Notification Settings</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
