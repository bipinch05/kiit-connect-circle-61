
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, MessageSquare, Trash, Eye, Send } from "lucide-react";

export const AdminMessages = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock message data
  const messages = [
    { id: 1, sender: "John Doe", recipient: "Career Services", subject: "Question about job fair", date: "2023-06-10", status: "Unread" },
    { id: 2, sender: "Jane Smith", recipient: "Alumni Office", subject: "Updating contact information", date: "2023-06-08", status: "Read" },
    { id: 3, sender: "Mike Johnson", recipient: "All Alumni", subject: "Networking opportunity", date: "2023-06-05", status: "Read" },
    { id: 4, sender: "Sarah Williams", recipient: "Event Coordinators", subject: "Speaker for upcoming event", date: "2023-06-02", status: "Unread" },
    { id: 5, sender: "Alex Brown", recipient: "Class of 2022", subject: "Reunion planning", date: "2023-05-28", status: "Read" },
  ];

  // Filter messages based on search query
  const filteredMessages = messages.filter(message => 
    message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="relative w-64">
          <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Button>
          <Send className="mr-2 h-4 w-4" />
          Send Message
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sender</TableHead>
              <TableHead>Recipient</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMessages.map((message) => (
              <TableRow key={message.id}>
                <TableCell className="font-medium">{message.sender}</TableCell>
                <TableCell>{message.recipient}</TableCell>
                <TableCell>{message.subject}</TableCell>
                <TableCell>{message.date}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-xs ${
                    message.status === 'Unread' ? 'bg-blue-100 text-blue-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {message.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash className="h-4 w-4" />
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
