
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Plus, Edit, Trash, Check, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export const AdminJobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock job data
  const jobs = [
    { id: 1, title: "Software Engineer", company: "Google", location: "Mountain View, CA", type: "Full-time", postedBy: "John Doe", status: "Active", applications: 24 },
    { id: 2, title: "Product Manager", company: "Apple", location: "Cupertino, CA", type: "Full-time", postedBy: "Jane Smith", status: "Active", applications: 18 },
    { id: 3, title: "UX Designer", company: "Microsoft", location: "Remote", type: "Contract", postedBy: "Mike Johnson", status: "Closed", applications: 32 },
    { id: 4, title: "Data Scientist", company: "Amazon", location: "Seattle, WA", type: "Full-time", postedBy: "Sarah Williams", status: "Active", applications: 15 },
    { id: 5, title: "Marketing Specialist", company: "Netflix", location: "Los Angeles, CA", type: "Part-time", postedBy: "Alex Brown", status: "Pending", applications: 8 },
  ];

  // Filter jobs based on search query
  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="relative w-64">
          <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Job
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Job</DialogTitle>
              <DialogDescription>
                Create a new job listing in the system.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="title" className="text-right">Job Title</label>
                <Input id="title" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="company" className="text-right">Company</label>
                <Input id="company" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="location" className="text-right">Location</label>
                <Input id="location" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="type" className="text-right">Job Type</label>
                <Input id="type" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <label htmlFor="description" className="text-right pt-2">Description</label>
                <Textarea id="description" className="col-span-3" rows={5} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save Job</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Applications</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredJobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">{job.title}</TableCell>
                <TableCell>{job.company}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.type}</TableCell>
                <TableCell>{job.applications}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-xs ${
                    job.status === 'Active' ? 'bg-green-100 text-green-800' : 
                    job.status === 'Closed' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {job.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash className="h-4 w-4" />
                  </Button>
                  {job.status !== 'Active' ? (
                    <Button variant="ghost" size="icon">
                      <Check className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button variant="ghost" size="icon">
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
