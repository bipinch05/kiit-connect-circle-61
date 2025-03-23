
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BriefcaseBusiness } from "lucide-react";
import { createJob } from "@/services/api";
import { toast } from "@/components/ui/use-toast";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface JobFormData {
  title: string;
  company: string;
  location: string;
  description: string;
  type: string;
  salary?: string;
  requirements: string;
  responsibilities: string;
  contactEmail?: string;
  applyUrl?: string;
}

export const CreateJobDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<JobFormData>();
  
  const onSubmit = async (data: JobFormData) => {
    setIsLoading(true);
    try {
      const requirementsArray = data.requirements
        .split('\n')
        .map(item => item.trim())
        .filter(item => item !== '');
        
      const responsibilitiesArray = data.responsibilities
        .split('\n')
        .map(item => item.trim())
        .filter(item => item !== '');
        
      const newJob = {
        ...data,
        requirements: requirementsArray,
        responsibilities: responsibilitiesArray,
        status: 'Active',
        postedDate: new Date(),
        applications: 0
      };
      
      await createJob(newJob);
      
      toast({
        title: "Success",
        description: "Job posting created successfully!",
      });
      
      reset();
      setIsOpen(false);
    } catch (error) {
      console.error("Error creating job posting:", error);
      toast({
        title: "Error",
        description: "Failed to create job posting. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <AnimatedButton variant="primary">
          <BriefcaseBusiness size={16} className="mr-2" />
          Post Job
        </AnimatedButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Job Posting</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new job opportunity.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="grid w-full gap-2">
            <Label htmlFor="title">Job Title</Label>
            <Input 
              id="title" 
              placeholder="e.g. Software Engineer" 
              {...register("title", { required: "Job title is required" })}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid w-full gap-2">
              <Label htmlFor="company">Company</Label>
              <Input 
                id="company" 
                placeholder="Company name" 
                {...register("company", { required: "Company is required" })}
              />
              {errors.company && <p className="text-red-500 text-sm">{errors.company.message}</p>}
            </div>
            
            <div className="grid w-full gap-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                placeholder="e.g. Remote, New York, etc." 
                {...register("location")}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid w-full gap-2">
              <Label htmlFor="type">Job Type</Label>
              <Select onValueChange={(value) => setValue("type", value)}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                  <SelectItem value="Temporary">Temporary</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid w-full gap-2">
              <Label htmlFor="salary">Salary (Optional)</Label>
              <Input 
                id="salary" 
                placeholder="e.g. $70,000 - $90,000" 
                {...register("salary")}
              />
            </div>
          </div>
          
          <div className="grid w-full gap-2">
            <Label htmlFor="description">Job Description</Label>
            <Textarea 
              id="description" 
              placeholder="Enter job description" 
              {...register("description")}
              className="min-h-[100px]"
            />
          </div>
          
          <div className="grid w-full gap-2">
            <Label htmlFor="requirements">Requirements (One per line)</Label>
            <Textarea 
              id="requirements" 
              placeholder="Enter job requirements (one per line)" 
              {...register("requirements")}
              className="min-h-[100px]"
            />
          </div>
          
          <div className="grid w-full gap-2">
            <Label htmlFor="responsibilities">Responsibilities (One per line)</Label>
            <Textarea 
              id="responsibilities" 
              placeholder="Enter job responsibilities (one per line)" 
              {...register("responsibilities")}
              className="min-h-[100px]"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid w-full gap-2">
              <Label htmlFor="contactEmail">Contact Email (Optional)</Label>
              <Input 
                id="contactEmail" 
                type="email"
                placeholder="Email for applications" 
                {...register("contactEmail")}
              />
            </div>
            
            <div className="grid w-full gap-2">
              <Label htmlFor="applyUrl">Application URL (Optional)</Label>
              <Input 
                id="applyUrl" 
                placeholder="URL to apply for this job" 
                {...register("applyUrl")}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Posting..." : "Post Job"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
