
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
import { UserPlus } from "lucide-react";
import { createUser } from "@/services/api";
import { toast } from "@/components/ui/use-toast";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UserFormData {
  name: string;
  email: string;
  avatar?: string;
  role: string;
  company?: string;
  location?: string;
  graduationYear?: number;
  department?: string;
  skills?: string;
  bio?: string;
}

export const UserOnboardingDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<UserFormData>();
  
  const onSubmit = async (data: UserFormData) => {
    setIsLoading(true);
    try {
      const skillsArray = data.skills
        ? data.skills.split(',').map(skill => skill.trim()).filter(skill => skill !== '')
        : [];
        
      const userData = {
        ...data,
        skills: skillsArray,
        isAdmin: false,
      };
      
      await createUser(userData);
      
      toast({
        title: "Success",
        description: "User profile created successfully!",
      });
      
      reset();
      setIsOpen(false);
    } catch (error) {
      console.error("Error creating user profile:", error);
      toast({
        title: "Error",
        description: "Failed to create user profile. Please try again.",
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
          <UserPlus size={16} className="mr-2" />
          Create Profile
        </AnimatedButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Alumni Profile</DialogTitle>
          <DialogDescription>
            Complete your profile information to join the alumni network.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid w-full gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                placeholder="Enter your full name" 
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            
            <div className="grid w-full gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email"
                placeholder="Enter your email" 
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
          </div>
          
          <div className="grid w-full gap-2">
            <Label htmlFor="avatar">Profile Picture URL (Optional)</Label>
            <Input 
              id="avatar" 
              placeholder="Enter profile picture URL" 
              {...register("avatar")}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid w-full gap-2">
              <Label htmlFor="role">Role</Label>
              <Select onValueChange={(value) => setValue("role", value)}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Alumni">Alumni</SelectItem>
                  <SelectItem value="Student">Student</SelectItem>
                  <SelectItem value="Faculty">Faculty</SelectItem>
                  <SelectItem value="Industry Professional">Industry Professional</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid w-full gap-2">
              <Label htmlFor="company">Company/Organization (Optional)</Label>
              <Input 
                id="company" 
                placeholder="Where do you work?" 
                {...register("company")}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="grid w-full gap-2">
              <Label htmlFor="department">Department</Label>
              <Input 
                id="department" 
                placeholder="e.g. Computer Science" 
                {...register("department")}
              />
            </div>
            
            <div className="grid w-full gap-2">
              <Label htmlFor="graduationYear">Graduation Year</Label>
              <Input 
                id="graduationYear" 
                type="number"
                placeholder="Year" 
                {...register("graduationYear", { 
                  setValueAs: (v) => v === "" ? undefined : parseInt(v, 10)
                })}
              />
            </div>
            
            <div className="grid w-full gap-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                placeholder="City, Country" 
                {...register("location")}
              />
            </div>
          </div>
          
          <div className="grid w-full gap-2">
            <Label htmlFor="skills">Skills (Comma separated)</Label>
            <Input 
              id="skills" 
              placeholder="e.g. JavaScript, Project Management, Marketing" 
              {...register("skills")}
            />
          </div>
          
          <div className="grid w-full gap-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea 
              id="bio" 
              placeholder="Tell us about yourself" 
              {...register("bio")}
              className="min-h-[100px]"
            />
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
              {isLoading ? "Creating..." : "Create Profile"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
