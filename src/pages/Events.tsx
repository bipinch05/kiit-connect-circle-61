import React, { useState } from "react";
import { Search, Filter, CalendarDays, MapPin, Plus } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedButton from "@/components/ui/AnimatedButton";
import EventCard, { EventData } from "@/components/alumni/EventCard";
import GlassCard from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "@/services/api";

const Events = () => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "my-events">("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  const { data: events, isLoading, error } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });

  const filteredEvents = events ? events.filter(event => {
    const today = new Date();
    const eventDate = new Date(event.date);
    
    if (activeTab === "upcoming" && eventDate >= today) {
      return true;
    } else if (activeTab === "past" && eventDate < today) {
      return true;
    } else if (activeTab === "my-events" && event.attendees?.includes("current-user-id")) {
      return true;
    }
    
    return false;
  }) : [];

  const searchedEvents = searchQuery && filteredEvents
    ? filteredEvents.filter(event => 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        event.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.organizer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredEvents;

  const formattedEvents: EventData[] = searchedEvents ? searchedEvents.map(event => ({
    id: event._id,
    title: event.title,
    description: event.description || "",
    image: event.image,
    date: new Date(event.date),
    startTime: event.startTime || "TBD",
    endTime: event.endTime || "TBD",
    location: event.location,
    isOnline: event.isOnline || false,
    organizer: event.organizer,
    attendeeCount: event.attendeeCount || 0,
    maxAttendees: event.maxAttendees,
    rsvp: null,
  })) : [];

  const popularEvents = events 
    ? events
        .filter(event => new Date(event.date) >= new Date())
        .sort((a, b) => (b.attendeeCount || 0) - (a.attendeeCount || 0))
        .slice(0, 3)
    : [];

  return (
    <div className="min-h-screen bg-kiit-black">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <h1 className="text-3xl font-display font-bold text-white">Events & Meetups</h1>
            
            <AnimatedButton variant="primary">
              <Plus size={16} className="mr-2" />
              Create Event
            </AnimatedButton>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <div className="lg:col-span-1">
              <GlassCard className="p-6">
                <div className="mb-6">
                  <h2 className="text-lg font-medium text-white mb-4">Filters</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center border border-white/10 rounded-lg overflow-hidden">
                      <button 
                        className={cn(
                          "flex-1 py-2 text-sm font-medium",
                          activeTab === "upcoming" 
                            ? "bg-kiit-gold text-black" 
                            : "bg-transparent text-white/70 hover:bg-white/5"
                        )}
                        onClick={() => setActiveTab("upcoming")}
                      >
                        Upcoming
                      </button>
                      <button 
                        className={cn(
                          "flex-1 py-2 text-sm font-medium",
                          activeTab === "past" 
                            ? "bg-kiit-gold text-black" 
                            : "bg-transparent text-white/70 hover:bg-white/5"
                        )}
                        onClick={() => setActiveTab("past")}
                      >
                        Past
                      </button>
                      <button 
                        className={cn(
                          "flex-1 py-2 text-sm font-medium",
                          activeTab === "my-events" 
                            ? "bg-kiit-gold text-black" 
                            : "bg-transparent text-white/70 hover:bg-white/5"
                        )}
                        onClick={() => setActiveTab("my-events")}
                      >
                        My Events
                      </button>
                    </div>
                    
                    <div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Search size={16} className="text-white/40" />
                        </div>
                        <input
                          type="text"
                          placeholder="Search events..."
                          className="w-full py-2 pl-10 pr-4 bg-kiit-darkgray text-white rounded-lg border border-white/10 
                                   focus:outline-none focus:ring-1 focus:ring-kiit-gold focus:border-kiit-gold text-sm"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <button 
                        className="flex items-center justify-between w-full py-2 text-white/80 hover:text-white"
                        onClick={() => setShowFilters(!showFilters)}
                      >
                        <span className="font-medium">Advanced Filters</span>
                        <Filter size={16} />
                      </button>
                      
                      {showFilters && (
                        <div className="mt-4 space-y-4">
                          <div>
                            <h3 className="text-sm font-medium text-white/80 mb-2">Event Type</h3>
                            <div className="space-y-2">
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded bg-kiit-black border-white/20 text-kiit-gold focus:ring-kiit-gold/50 mr-2"
                                />
                                <span className="text-sm text-white/70">In-person</span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded bg-kiit-black border-white/20 text-kiit-gold focus:ring-kiit-gold/50 mr-2"
                                />
                                <span className="text-sm text-white/70">Virtual</span>
                              </label>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-white/80 mb-2">Date Range</h3>
                            <div className="space-y-2">
                              <div>
                                <label className="text-sm text-white/70 block mb-1">From</label>
                                <input
                                  type="date"
                                  className="w-full py-1.5 px-3 bg-kiit-darkgray text-white rounded border border-white/10 
                                           focus:outline-none focus:ring-1 focus:ring-kiit-gold focus:border-kiit-gold text-sm"
                                />
                              </div>
                              <div>
                                <label className="text-sm text-white/70 block mb-1">To</label>
                                <input
                                  type="date"
                                  className="w-full py-1.5 px-3 bg-kiit-darkgray text-white rounded border border-white/10 
                                           focus:outline-none focus:ring-1 focus:ring-kiit-gold focus:border-kiit-gold text-sm"
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-white/80 mb-2">Category</h3>
                            <select
                              className="w-full py-2 px-3 bg-kiit-darkgray text-white rounded-lg border border-white/10 
                                       focus:outline-none focus:ring-1 focus:ring-kiit-gold focus:border-kiit-gold text-sm"
                            >
                              <option value="">All Categories</option>
                              <option value="networking">Networking</option>
                              <option value="workshop">Workshop</option>
                              <option value="seminar">Seminar</option>
                              <option value="social">Social</option>
                              <option value="career">Career</option>
                            </select>
                          </div>
                          
                          <AnimatedButton variant="outline" size="sm" className="w-full">
                            Apply Filters
                          </AnimatedButton>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-medium text-white mb-4">Popular Events</h2>
                  
                  <div className="space-y-4">
                    {popularEvents.map(event => (
                      <div key={event._id} className="flex gap-3">
                        <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                          {event.image ? (
                            <img
                              src={event.image}
                              alt={event.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-white/5 flex items-center justify-center">
                              <CalendarDays size={20} className="text-kiit-gold/70" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-white leading-tight">
                            {event.title}
                          </h3>
                          <div className="flex items-center text-white/50 text-xs mt-1">
                            <CalendarDays size={10} className="mr-1" />
                            {new Date(event.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                          <div className="flex items-center text-white/50 text-xs mt-0.5">
                            <MapPin size={10} className="mr-1" />
                            {event.isOnline ? "Virtual" : event.location}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </div>
            
            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="text-center py-12">
                  <p className="text-white/70">Loading events...</p>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-red-400">Error loading events</p>
                </div>
              ) : formattedEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {formattedEvents.map(event => (
                    <EventCard key={event.id} event={event} animation="fade" />
                  ))}
                </div>
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-16">
                  <CalendarDays size={48} className="text-white/20 mb-4" />
                  <h3 className="text-xl font-medium text-white mb-2">No events found</h3>
                  <p className="text-white/60 text-center max-w-md">
                    {searchQuery 
                      ? `No events matching "${searchQuery}" were found. Try a different search term.` 
                      : "There are no events in this category yet."}
                  </p>
                  {activeTab !== "upcoming" && (
                    <AnimatedButton 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setActiveTab("upcoming")}
                    >
                      View Upcoming Events
                    </AnimatedButton>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Events;
