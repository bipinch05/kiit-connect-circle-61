
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Building, MapPin, Clock, Briefcase, ExternalLink, Bookmark, CheckCircle } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import AnimatedButton from "../ui/AnimatedButton";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

export interface JobData {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  salary?: string;
  employmentType: "Full-time" | "Part-time" | "Contract" | "Internship" | "Freelance";
  experienceLevel: string;
  postDate: Date;
  deadline?: Date;
  description: string;
  skills: string[];
  postedById: string;
  postedByName: string;
  applied?: boolean;
  saved?: boolean;
}

interface JobListingProps {
  job: JobData;
  className?: string;
  animation?: "fade" | "scale" | "slide" | "none";
  delay?: number;
  onSaveToggle?: (jobId: string, isSaved: boolean) => void;
  onApply?: (jobId: string) => void;
}

const JobListing: React.FC<JobListingProps> = ({
  job,
  className,
  animation = "none",
  delay = 0,
  onSaveToggle,
  onApply,
}) => {
  const [saved, setSaved] = useState(job.saved || false);
  const [applied, setApplied] = useState(job.applied || false);

  const {
    id,
    title,
    company,
    companyLogo,
    location,
    salary,
    employmentType,
    experienceLevel,
    postDate,
    deadline,
    description,
    skills,
    postedByName,
  } = job;

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // Calculate days ago
  const getDaysAgo = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - new Date(date).getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else {
      return `${diffDays} days ago`;
    }
  };

  // Get employment type color
  const getEmploymentTypeColor = () => {
    switch (employmentType) {
      case "Full-time":
        return "bg-blue-500/20 text-blue-200";
      case "Part-time":
        return "bg-purple-500/20 text-purple-200";
      case "Contract":
        return "bg-orange-500/20 text-orange-200";
      case "Internship":
        return "bg-green-500/20 text-green-200";
      case "Freelance":
        return "bg-pink-500/20 text-pink-200";
      default:
        return "bg-gray-500/20 text-gray-200";
    }
  };

  // Check if job is new (posted within last 3 days)
  const isNewJob = () => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - new Date(postDate).getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3;
  };

  const handleSaveToggle = () => {
    const newSavedState = !saved;
    setSaved(newSavedState);
    if (onSaveToggle) {
      onSaveToggle(id, newSavedState);
    }
    
    toast({
      title: newSavedState ? "Job Saved" : "Job Removed",
      description: newSavedState 
        ? `${title} at ${company} has been saved to your list.` 
        : `${title} at ${company} has been removed from your saved list.`,
    });
  };

  const handleApply = () => {
    setApplied(true);
    if (onApply) {
      onApply(id);
    }
    
    toast({
      title: "Application Submitted",
      description: `Your application for ${title} at ${company} has been submitted.`,
    });
  };

  return (
    <GlassCard 
      className={cn("h-full", className)}
      hover={true}
      animation={animation}
      delay={delay}
    >
      <div className="p-5 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div className="flex">
            {companyLogo ? (
              <div className="mr-3 w-12 h-12 rounded overflow-hidden bg-white/5 flex items-center justify-center p-1">
                <img
                  src={companyLogo}
                  alt={company}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="mr-3 w-12 h-12 bg-white/5 rounded flex items-center justify-center">
                <Building className="w-6 h-6 text-white/40" />
              </div>
            )}
            <div>
              <h3 className="font-medium text-white text-lg">{title}</h3>
              <p className="text-white/70 text-sm">{company}</p>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-xs text-white/50 mb-1">{getDaysAgo(postDate)}</span>
            {isNewJob() && (
              <span className="px-2 py-0.5 bg-kiit-gold/90 text-black rounded text-xs font-medium">
                New
              </span>
            )}
          </div>
        </div>
        
        <div className="mb-4 grid grid-cols-2 gap-y-2 text-sm">
          <div className="flex items-center text-white/70">
            <MapPin size={14} className="mr-2 flex-shrink-0" />
            <span>{location}</span>
          </div>
          
          {salary && (
            <div className="flex items-center text-white/70">
              <span className="text-kiit-gold mr-2 font-medium">${salary}</span>
            </div>
          )}
          
          <div className="flex items-center text-white/70">
            <Briefcase size={14} className="mr-2 flex-shrink-0" />
            <span>{experienceLevel}</span>
          </div>
          
          {deadline && (
            <div className="flex items-center text-white/70">
              <Clock size={14} className="mr-2 flex-shrink-0" />
              <span>Until {formatDate(deadline)}</span>
            </div>
          )}
        </div>
        
        <div className="mb-2">
          <span 
            className={cn(
              "inline-block px-2 py-0.5 rounded text-xs font-medium",
              getEmploymentTypeColor()
            )}
          >
            {employmentType}
          </span>
        </div>
        
        <p className="text-white/70 text-sm mb-4 line-clamp-3">{description}</p>
        
        <div className="mb-4 flex flex-wrap gap-2">
          {skills.slice(0, 4).map((skill, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-white/5 rounded-md text-xs text-white/80"
            >
              {skill}
            </span>
          ))}
          {skills.length > 4 && (
            <span className="px-2 py-1 bg-white/5 rounded-md text-xs text-white/60">
              +{skills.length - 4} more
            </span>
          )}
        </div>
        
        <div className="text-xs text-white/50 mb-5">
          Posted by: {postedByName}
        </div>
        
        <div className="mt-auto space-y-3">
          {!applied ? (
            <div className="flex gap-3">
              <AnimatedButton 
                variant="primary" 
                size="sm" 
                className="flex-1"
                onClick={handleApply}
              >
                {applied ? (
                  <>
                    <CheckCircle size={14} className="mr-2" />
                    Applied
                  </>
                ) : (
                  "Apply Now"
                )}
              </AnimatedButton>
              <AnimatedButton 
                variant={saved ? "secondary" : "outline"}
                size="sm" 
                className="flex-1"
                onClick={handleSaveToggle}
              >
                <Bookmark size={14} className={cn("mr-2", saved && "fill-current")} />
                {saved ? "Saved" : "Save Job"}
              </AnimatedButton>
            </div>
          ) : (
            <AnimatedButton 
              variant="secondary" 
              size="sm" 
              className="w-full"
              disabled
            >
              <CheckCircle size={14} className="mr-2" />
              Applied
            </AnimatedButton>
          )}
          
          <Link to={`/jobs/${id}`}>
            <AnimatedButton 
              variant="secondary" 
              size="sm" 
              className="w-full flex items-center justify-center"
            >
              <span>View Details</span>
              <ExternalLink size={14} className="ml-1" />
            </AnimatedButton>
          </Link>
        </div>
      </div>
    </GlassCard>
  );
};

export default JobListing;
