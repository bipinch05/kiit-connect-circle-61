
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Plus, Edit, Trash, Calendar } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export const AdminEvents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock event data
  const events = [
    { id: 1, title: "Annual Alumni Networking", date: "2023-06-15", time: "18:00", location: "University Hall", organizer: "John Doe", attendees: 128, status: "Upcoming" },
    { id: 2, title: "Career Fair", date: "2023-07-20", time: "10:00", location: "Student Center", organizer: "Jane Smith", attendees: 210, status: "Upcoming" },
    { id: 3, title: "Tech Talk: AI Future", date: "2023-05-12", time: "14:00", location: "Online", organizer: "Mike Johnson", attendees: 95, status: "Completed" },
    { id: 4, title: "Homecoming Celebration", date: "2023-10-05", time: "12:00", location: "Campus Square", organizer: "Sarah Williams", attendees: 350, status: "Upcoming" },
    { id: 5, title: "Workshop: Resume Building", date: "2023-04-28", time: "15:30", location: "Library", organizer: "Alex Brown", attendees: 45, status: "Cancelled" },
  ];

  // Filter events based on search query
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.organizer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="relative w-64">
          <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
              <DialogDescription>
                Create a new event in the system.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="title" className="text-right">Event Title</label>
                <Input id="title" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="date" className="text-right">Date</label>
                <Input id="date" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="time" className="text-right">Time</label>
                <Input id="time" type="time" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="location" className="text-right">Location</label>
                <Input id="location" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <label htmlFor="description" className="text-right pt-2">Description</label>
                <Textarea id="description" className="col-span-3" rows={5} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save Event</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Attendees</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEvents.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">{event.title}</TableCell>
                <TableCell>{event.date}</TableCell>
                <TableCell>{event.time}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>{event.attendees}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-xs ${
                    event.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' : 
                    event.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {event.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Calendar className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
