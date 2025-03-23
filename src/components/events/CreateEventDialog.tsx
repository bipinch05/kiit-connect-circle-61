
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
import { Calendar } from "lucide-react";
import { createEvent } from "@/services/api";
import { toast } from "@/components/ui/use-toast";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";

interface EventFormData {
  title: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  isOnline: boolean;
  organizer: string;
  maxAttendees?: number;
}

export const CreateEventDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<EventFormData>();
  
  const onSubmit = async (data: EventFormData) => {
    setIsLoading(true);
    try {
      const newEvent = {
        ...data,
        date: date || new Date(),
        attendeeCount: 0,
      };
      
      await createEvent(newEvent);
      
      toast({
        title: "Success",
        description: "Event created successfully!",
      });
      
      reset();
      setIsOpen(false);
    } catch (error) {
      console.error("Error creating event:", error);
      toast({
        title: "Error",
        description: "Failed to create event. Please try again.",
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
          <Calendar size={16} className="mr-2" />
          Create Event
        </AnimatedButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new event.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="grid w-full gap-2">
            <Label htmlFor="title">Event Title</Label>
            <Input 
              id="title" 
              placeholder="Enter event title" 
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>
          
          <div className="grid w-full gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Enter event description" 
              {...register("description")}
              className="min-h-[100px]"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid w-full gap-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start text-left font-normal">
                    {date ? format(date, "PPP") : "Select a date"}
                    <Calendar className="ml-auto h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid w-full gap-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input 
                id="startTime" 
                type="time" 
                {...register("startTime")}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid w-full gap-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input 
                id="endTime" 
                type="time" 
                {...register("endTime")}
              />
            </div>
            
            <div className="grid w-full gap-2">
              <Label htmlFor="maxAttendees">Max Attendees</Label>
              <Input 
                id="maxAttendees" 
                type="number"
                placeholder="Leave empty for unlimited" 
                {...register("maxAttendees", { 
                  setValueAs: (v) => v === "" ? undefined : parseInt(v, 10)
                })}
              />
            </div>
          </div>
          
          <div className="grid w-full gap-2">
            <Label htmlFor="location">Location</Label>
            <Input 
              id="location" 
              placeholder="Enter event location" 
              {...register("location")}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Input 
              id="isOnline" 
              type="checkbox" 
              className="w-4 h-4" 
              {...register("isOnline")}
            />
            <Label htmlFor="isOnline" className="font-normal">This is an online event</Label>
          </div>
          
          <div className="grid w-full gap-2">
            <Label htmlFor="organizer">Organizer</Label>
            <Input 
              id="organizer" 
              placeholder="Enter organizer name" 
              {...register("organizer")}
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
              {isLoading ? "Creating..." : "Create Event"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
