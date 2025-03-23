
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { Users, Plus, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchCommunities } from "@/services/api";
import { toast } from "@/components/ui/use-toast";
import { CreateCommunityDialog } from "@/components/communities/CreateCommunityDialog";

const Communities = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Fetch communities using React Query
  const { data: communities, isLoading, error } = useQuery({
    queryKey: ['communities'],
    queryFn: fetchCommunities,
  });

  const handleJoinCommunity = (id: string) => {
    // In a real implementation, this would make an API call to join the community
    toast({
      title: "Success",
      description: "You have joined the community!",
    });
  };

  const filteredCommunities = searchQuery && communities 
    ? communities.filter(community => 
        community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (community.description && community.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : communities;

  return (
    <div className="min-h-screen bg-kiit-black">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <h1 className="text-3xl font-display font-bold text-white">Communities</h1>
            
            <CreateCommunityDialog />
          </div>
          
          <div className="mb-8 max-w-md">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-white/40" />
              </div>
              <input
                type="text"
                placeholder="Search communities..."
                className="w-full py-2 pl-10 pr-4 bg-kiit-darkgray text-white rounded-lg border border-white/10 
                         focus:outline-none focus:ring-1 focus:ring-kiit-gold focus:border-kiit-gold"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-white/70">Loading communities...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-400">Error loading communities</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCommunities && filteredCommunities.length > 0 ? (
                filteredCommunities.map((community) => (
                  <GlassCard 
                    key={community._id}
                    hover={true}
                    animation="fade"
                    clickable={true}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={community.image || "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} 
                        alt={community.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-kiit-black to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-semibold text-white">{community.name}</h3>
                        <div className="flex items-center text-white/60 text-sm mt-1">
                          <Users size={14} className="mr-1" />
                          {community.members} members
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-white/70 mb-4">{community.description}</p>
                      <AnimatedButton 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => handleJoinCommunity(community._id)}
                      >
                        Join Community
                      </AnimatedButton>
                    </div>
                  </GlassCard>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-white/70">No communities found</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Communities;
