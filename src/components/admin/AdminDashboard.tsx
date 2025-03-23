
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, Briefcase, MessageSquare } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers, fetchEvents, fetchMessages } from "@/services/api";

export const AdminDashboard = () => {
  // Fetch data using React Query
  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetchUsers(),
  });

  const { data: events } = useQuery({
    queryKey: ['events'],
    queryFn: () => fetchEvents(),
  });

  const { data: messages } = useQuery({
    queryKey: ['messages'],
    queryFn: () => fetchMessages(),
  });

  // Calculate stats based on fetched data
  const stats = [
    { 
      title: "Total Users", 
      value: users?.length || "0", 
      icon: Users, 
      change: "+12%" 
    },
    { 
      title: "Active Events", 
      value: events?.filter(e => new Date(e.date) >= new Date()).length || "0", 
      icon: Calendar, 
      change: "+5%" 
    },
    { 
      title: "Open Jobs", 
      value: "48", 
      icon: Briefcase, 
      change: "+18%" 
    },
    { 
      title: "New Messages", 
      value: messages?.filter(m => m.status === "Unread").length || "0", 
      icon: MessageSquare, 
      change: "+24%" 
    },
  ];

  // Recent activity based on database data
  const recentActivity = [
    ...users ? users.slice(0, 2).map(user => ({
      text: `${user.name} joined the alumni network`,
      time: new Date(user.createdAt).toLocaleDateString(),
    })) : [],
    ...events ? events.slice(0, 2).map(event => ({
      text: `New event created: ${event.title}`,
      time: new Date(event.createdAt).toLocaleDateString(),
    })) : [],
  ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
   .slice(0, 4);

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
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => (
                  <div key={index} className="border-b pb-2">
                    <p className="text-sm">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No recent activity found</p>
                </div>
              )}
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
