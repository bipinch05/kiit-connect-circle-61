
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, Briefcase, MessageSquare } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

export const AdminDashboard = () => {
  // Mock data for the dashboard
  const stats = [
    { title: "Total Users", value: "1,254", icon: Users, change: "+12%" },
    { title: "Active Events", value: "23", icon: Calendar, change: "+5%" },
    { title: "Open Jobs", value: "48", icon: Briefcase, change: "+18%" },
    { title: "New Messages", value: "156", icon: MessageSquare, change: "+24%" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard title="Recent Activity" className="h-[300px]">
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-2">
                <p className="text-sm">John Doe joined the alumni network</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
              <div className="border-b pb-2">
                <p className="text-sm">New job posted: Software Engineer at Google</p>
                <p className="text-xs text-muted-foreground">5 hours ago</p>
              </div>
              <div className="border-b pb-2">
                <p className="text-sm">Career networking event created for June 15</p>
                <p className="text-xs text-muted-foreground">Yesterday</p>
              </div>
              <div>
                <p className="text-sm">New community: AI Enthusiasts</p>
                <p className="text-xs text-muted-foreground">2 days ago</p>
              </div>
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard title="System Health" className="h-[300px]">
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Server Status</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Operational</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Database Status</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Operational</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">API Status</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Operational</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Storage Status</span>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">75% Used</span>
              </div>
            </div>
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
};
