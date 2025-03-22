
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { LayoutDashboard, Users, Calendar, Briefcase, MessageSquare, Globe, Settings } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminUsers } from "@/components/admin/AdminUsers";
import { AdminEvents } from "@/components/admin/AdminEvents";
import { AdminJobs } from "@/components/admin/AdminJobs";
import { AdminMessages } from "@/components/admin/AdminMessages";
import { AdminCommunities } from "@/components/admin/AdminCommunities";
import { AdminSettings } from "@/components/admin/AdminSettings";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Alumni Network</title>
      </Helmet>
      
      <Navbar />
      
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full bg-gray-100">
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
              
              {activeTab === "dashboard" && <AdminDashboard />}
              {activeTab === "users" && <AdminUsers />}
              {activeTab === "events" && <AdminEvents />}
              {activeTab === "jobs" && <AdminJobs />}
              {activeTab === "messages" && <AdminMessages />}
              {activeTab === "communities" && <AdminCommunities />}
              {activeTab === "settings" && <AdminSettings />}
            </div>
          </main>
        </div>
      </SidebarProvider>
      
      <Footer />
    </>
  );
};

const AdminSidebar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => {
  const menuItems = [
    { id: "dashboard", title: "Dashboard", icon: LayoutDashboard },
    { id: "users", title: "Users", icon: Users },
    { id: "events", title: "Events", icon: Calendar },
    { id: "jobs", title: "Jobs", icon: Briefcase },
    { id: "messages", title: "Messages", icon: MessageSquare },
    { id: "communities", title: "Communities", icon: Globe },
    { id: "settings", title: "Settings", icon: Settings },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-xl font-bold px-4 py-2">Admin Panel</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton 
                isActive={activeTab === item.id}
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-4 py-2 text-sm text-gray-500">
          Admin version 1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default Admin;
