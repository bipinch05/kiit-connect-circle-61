
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
import { Users } from "lucide-react";
import { createCommunity } from "@/services/api";
import { toast } from "@/components/ui/use-toast";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { Label } from "@/components/ui/label";

interface CommunityFormData {
  name: string;
  description: string;
  image?: string;
}

export const CreateCommunityDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CommunityFormData>();
  
  const onSubmit = async (data: CommunityFormData) => {
    setIsLoading(true);
    try {
      const newCommunity = {
        ...data,
        members: 1, // Start with the creator as a member
      };
      
      await createCommunity(newCommunity);
      
      toast({
        title: "Success",
        description: "Community created successfully!",
      });
      
      reset();
      setIsOpen(false);
    } catch (error) {
      console.error("Error creating community:", error);
      toast({
        title: "Error",
        description: "Failed to create community. Please try again.",
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
          <Users size={16} className="mr-2" />
          Create Community
        </AnimatedButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Create New Community</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new community.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="grid w-full gap-2">
            <Label htmlFor="name">Community Name</Label>
            <Input 
              id="name" 
              placeholder="Enter community name" 
              {...register("name", { required: "Community name is required" })}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          
          <div className="grid w-full gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Enter community description" 
              {...register("description")}
              className="min-h-[100px]"
            />
          </div>
          
          <div className="grid w-full gap-2">
            <Label htmlFor="image">Image URL</Label>
            <Input 
              id="image" 
              placeholder="Enter image URL (optional)" 
              {...register("image")}
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
              {isLoading ? "Creating..." : "Create Community"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
