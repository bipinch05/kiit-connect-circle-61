
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { Users, Plus, Search } from "lucide-react";

const Communities = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data for communities
  const communities = [
    {
      id: "1",
      name: "Tech Innovators",
      description: "A community for KIIT alumni working in technology and innovation.",
      members: 234,
      image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "2",
      name: "Entrepreneurs Circle",
      description: "Connect with fellow KIIT entrepreneurs to share experiences and opportunities.",
      members: 156,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "3",
      name: "Healthcare Professionals",
      description: "A space for KIIT alumni in healthcare to network and collaborate.",
      members: 189,
      image: "https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "4",
      name: "Creative Arts & Media",
      description: "For alumni pursuing careers in creative fields like design, film, and media.",
      members: 142,
      image: "https://images.unsplash.com/photo-1560523159-4a9692d222f9?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "5",
      name: "Global KIIT Network",
      description: "Connect with KIIT alumni working and living around the world.",
      members: 315,
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "6",
      name: "Research & Academia",
      description: "For KIIT alumni in academic research and teaching positions.",
      members: 98,
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const filteredCommunities = searchQuery 
    ? communities.filter(community => 
        community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        community.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : communities;

  return (
    <div className="min-h-screen bg-kiit-black">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <h1 className="text-3xl font-display font-bold text-white">Communities</h1>
            
            <AnimatedButton variant="primary">
              <Plus size={16} className="mr-2" />
              Create Community
            </AnimatedButton>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCommunities.map((community) => (
              <GlassCard 
                key={community.id}
                hover={true}
                animation="fade"
                clickable={true}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={community.image} 
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
                  <AnimatedButton variant="outline" size="sm" className="w-full">
                    Join Community
                  </AnimatedButton>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Communities;
