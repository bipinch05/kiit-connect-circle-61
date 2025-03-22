
import React, { useState } from "react";
import { MapPin, Briefcase, Calendar, ArrowUpRight, MessageSquare } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import AnimatedButton from "../ui/AnimatedButton";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

export interface ProfileData {
  id: string;
  name: string;
  avatar?: string;
  role: string;
  company?: string;
  location?: string;
  graduationYear: number;
  department: string;
  skills: string[];
  connection?: "none" | "pending" | "connected";
}

interface ProfileCardProps {
  profile: ProfileData;
  className?: string;
  animation?: "fade" | "scale" | "slide" | "none";
  delay?: number;
  onConnect?: () => void;
  onMessage?: () => void;
  onProfileClick?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  className,
  animation = "none",
  delay = 0,
  onConnect,
  onMessage,
  onProfileClick,
}) => {
  const {
    id,
    name,
    avatar,
    role,
    company,
    location,
    graduationYear,
    department,
    skills,
    connection = "none",
  } = profile;

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const initials = getInitials(name);

  const handleConnectClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onConnect) onConnect();
  };

  const handleMessageClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onMessage) onMessage();
  };

  const handleCardClick = () => {
    if (onProfileClick) onProfileClick();
  };

  return (
    <GlassCard 
      className={cn("h-full cursor-pointer", className)} 
      hover={true}
      animation={animation}
      delay={delay}
      onClick={handleCardClick}
    >
      <div className="p-5 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className="mr-3">
              {avatar ? (
                <img
                  src={avatar}
                  alt={name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-kiit-gold/30"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-kiit-gold/30 to-kiit-gold/60 flex items-center justify-center text-lg font-medium text-white">
                  {initials}
                </div>
              )}
            </div>
            <div>
              <h3 className="font-medium text-white">{name}</h3>
              <p className="text-white/70 text-sm">{role}</p>
            </div>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              if (onProfileClick) onProfileClick();
            }}
            className="text-kiit-gold/70 hover:text-kiit-gold p-1 transition-colors"
            aria-label="View profile"
          >
            <ArrowUpRight size={18} />
          </button>
        </div>

        <div className="space-y-2 mb-4 text-sm">
          {company && (
            <div className="flex items-center text-white/70">
              <Briefcase size={14} className="mr-2 flex-shrink-0" />
              <span>{company}</span>
            </div>
          )}
          {location && (
            <div className="flex items-center text-white/70">
              <MapPin size={14} className="mr-2 flex-shrink-0" />
              <span>{location}</span>
            </div>
          )}
          <div className="flex items-center text-white/70">
            <Calendar size={14} className="mr-2 flex-shrink-0" />
            <span>Class of {graduationYear} • {department}</span>
          </div>
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          {skills.slice(0, 3).map((skill, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-white/5 rounded-md text-xs text-white/80"
            >
              {skill}
            </span>
          ))}
          {skills.length > 3 && (
            <span className="px-2 py-1 bg-white/5 rounded-md text-xs text-white/60">
              +{skills.length - 3}
            </span>
          )}
        </div>

        <div className="mt-auto">
          {connection === "connected" ? (
            <AnimatedButton 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={handleMessageClick}
            >
              <MessageSquare size={14} className="mr-2" />
              Message
            </AnimatedButton>
          ) : connection === "pending" ? (
            <AnimatedButton 
              variant="secondary"
              size="sm" 
              className="w-full"
              disabled
            >
              Request Sent
            </AnimatedButton>
          ) : (
            <AnimatedButton 
              variant="primary" 
              size="sm" 
              className="w-full"
              onClick={handleConnectClick}
            >
              Connect
            </AnimatedButton>
          )}
        </div>
      </div>
    </GlassCard>
  );
};

export default ProfileCard;
