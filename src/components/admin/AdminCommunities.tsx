
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Plus, Edit, Trash, Users } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export const AdminCommunities = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock community data
  const communities = [
    { id: 1, name: "Computer Science Alumni", description: "For CS graduates to network and share opportunities", members: 156, creator: "John Doe", status: "Active" },
    { id: 2, name: "Business Professionals", description: "MBA and business program alumni", members: 210, creator: "Jane Smith", status: "Active" },
    { id: 3, name: "Engineering Network", description: "All engineering disciplines networking group", members: 184, creator: "Mike Johnson", status: "Active" },
    { id: 4, name: "Healthcare Alumni", description: "Medical, nursing and healthcare professionals", members: 129, creator: "Sarah Williams", status: "Inactive" },
    { id: 5, name: "Arts and Humanities", description: "Creative arts, literature and humanities graduates", members: 97, creator: "Alex Brown", status: "Active" },
  ];

  // Filter communities based on search query
  const filteredCommunities = communities.filter(community => 
    community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.creator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="relative w-64">
          <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search communities..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Community
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Community</DialogTitle>
              <DialogDescription>
                Create a new alumni community in the system.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">Community Name</label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <label htmlFor="description" className="text-right pt-2">Description</label>
                <Textarea id="description" className="col-span-3" rows={3} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="category" className="text-right">Category</label>
                <Input id="category" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="visibility" className="text-right">Visibility</label>
                <Input id="visibility" className="col-span-3" placeholder="Public or Private" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Community</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Members</TableHead>
              <TableHead>Creator</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCommunities.map((community) => (
              <TableRow key={community.id}>
                <TableCell className="font-medium">{community.name}</TableCell>
                <TableCell>{community.description}</TableCell>
                <TableCell>{community.members}</TableCell>
                <TableCell>{community.creator}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-xs ${
                    community.status === 'Active' ? 'bg-green-100 text-green-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {community.status}
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
                    <Users className="h-4 w-4" />
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
