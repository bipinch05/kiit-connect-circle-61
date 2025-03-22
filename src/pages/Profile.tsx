import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin, Briefcase, GraduationCap, Calendar, Mail, Phone, Globe, 
  Linkedin, Twitter, Github, Facebook, Edit, Settings, MessageSquare,
  Users, Plus, Award
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import AnimatedButton from "@/components/ui/AnimatedButton";
import ProfileEditor, { ProfileData, ProfileEditorRef } from "@/components/profile/ProfileEditor";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

interface Education {
  id: string;
  degree: string;
  institution: string;
  department: string;
  year: string;
  description?: string;
}

interface Experience {
  id: string;
  role: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}

interface Skill {
  id: string;
  name: string;
  level?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

interface Achievement {
  id: string;
  title: string;
  year: string;
  description?: string;
}

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

// Keep the ProfileTabs component
const ProfileTabs: React.FC<ProfileTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "achievements", label: "Achievements" },
  ];

  return (
    <div className="flex space-x-1 border-b border-white/10 overflow-x-auto scrollbar-none">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={cn(
            "py-3 px-4 text-sm font-medium whitespace-nowrap transition-colors",
            "relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:transform",
            activeTab === tab.id
              ? "text-kiit-gold after:bg-kiit-gold"
              : "text-white/70 hover:text-white after:bg-transparent hover:after:bg-white/20"
          )}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [isConnected, setIsConnected] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Check if it's the user's own profile
  const isOwnProfile = !id || id === "me";

  // Generate ID for each item
  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  useEffect(() => {
    // This would be an API call in a real app
    // Here we'll simulate connections for the predefined alumni
    if (id === "1" || id === "5") {
      setIsConnected(true);
      setIsPending(false);
    } else if (id === "3") {
      setIsConnected(false);
      setIsPending(true);
    } else {
      setIsConnected(false);
      setIsPending(false);
    }
  }, [id]);
  
  // State for profile data
  const [profile, setProfile] = useState<ProfileData>({
    name: id === "1" ? "Priya Sharma" : 
          id === "2" ? "Rahul Verma" :
          id === "3" ? "Ananya Patel" :
          id === "4" ? "Vikram Singh" :
          id === "5" ? "Neha Gupta" :
          id === "6" ? "Arjun Malhotra" : "Your Profile",
    avatar: null, // Set to image URL if available
    headline: id === "1" ? "Software Engineer at Google" :
              id === "2" ? "Product Manager at Microsoft" :
              id === "3" ? "UI/UX Designer at Adobe" :
              id === "4" ? "Data Scientist at Amazon" :
              id === "5" ? "Mechanical Engineer at Tesla" :
              id === "6" ? "Investment Banker at Goldman Sachs" : "Your Headline",
    location: id === "1" ? "San Francisco, CA" : 
              id === "2" ? "Seattle, WA" :
              id === "3" ? "Bangalore, India" :
              id === "4" ? "New York, NY" :
              id === "5" ? "Austin, TX" :
              id === "6" ? "Mumbai, India" : "Your Location",
    bio: "Full-stack developer with 5 years of experience building web and mobile applications. Passionate about clean code, user experience, and building products that make a difference. KIIT alumna who loves to connect with fellow students and alumni.",
    contact: {
      email: "priya.sharma@example.com",
      phone: "+1 (555) 123-4567",
      website: "https://priyasharma.dev",
    },
    social: {
      linkedin: "priya-sharma",
      twitter: "priyasharmadev",
      github: "priyasharma",
      facebook: "priyasharma",
    },
    education: [
      {
        id: generateId(),
        degree: "B.Tech",
        institution: "KIIT University",
        department: "Computer Science",
        year: "2014-2018",
        description: "Specialized in AI and Machine Learning. President of the Coding Club. Graduated with honors.",
      },
      {
        id: generateId(),
        degree: "M.S.",
        institution: "Stanford University",
        department: "Computer Science",
        year: "2019-2021",
        description: "Focused on distributed systems and cloud computing.",
      },
    ],
    experience: [
      {
        id: generateId(),
        role: "Software Engineer",
        company: "Google",
        location: "San Francisco, CA",
        startDate: "Jan 2022",
        endDate: null,
        current: true,
        description: "Working on cloud infrastructure and distributed systems. Leading a team of 5 engineers on a new product initiative.",
      },
      {
        id: generateId(),
        role: "Software Developer",
        company: "Microsoft",
        location: "Seattle, WA",
        startDate: "Jul 2021",
        endDate: "Dec 2021",
        current: false,
        description: "Developed features for Microsoft Teams. Improved video call quality algorithms.",
      },
      {
        id: generateId(),
        role: "Software Engineering Intern",
        company: "Amazon",
        location: "Bangalore, India",
        startDate: "May 2020",
        endDate: "Aug 2020",
        current: false,
        description: "Worked on backend systems for Amazon Payments.",
      },
    ],
    skills: [
      { id: generateId(), name: "JavaScript", level: "Expert" as const },
      { id: generateId(), name: "React", level: "Expert" as const },
      { id: generateId(), name: "Node.js", level: "Advanced" as const },
      { id: generateId(), name: "Python", level: "Advanced" as const },
      { id: generateId(), name: "TypeScript", level: "Advanced" as const },
      { id: generateId(), name: "Docker", level: "Intermediate" as const },
      { id: generateId(), name: "Kubernetes", level: "Intermediate" as const },
      { id: generateId(), name: "GraphQL", level: "Advanced" as const },
      { id: generateId(), name: "MongoDB", level: "Advanced" as const },
      { id: generateId(), name: "SQL", level: "Advanced" as const },
      { id: generateId(), name: "AWS", level: "Advanced" as const },
      { id: generateId(), name: "Machine Learning", level: "Intermediate" as const },
    ],
    achievements: [
      {
        id: generateId(),
        title: "Google Cloud Certified Professional",
        year: "2022",
        description: "Certified as a Google Cloud Professional Developer.",
      },
      {
        id: generateId(),
        title: "Best Student Project Award",
        year: "2018",
        description: "Won the best student project award at KIIT for an AI-powered healthcare solution.",
      },
      {
        id: generateId(),
        title: "Published Research Paper",
        year: "2020",
        description: "Published a paper on distributed systems at the IEEE International Conference.",
      },
    ],
  });

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const initials = getInitials(profile.name);
  
  const handleConnect = () => {
    setIsPending(true);
    toast({
      title: "Connection Request Sent",
      description: `Your connection request to ${profile.name} has been sent.`,
    });
  };
  
  const handleMessage = () => {
    navigate(`/messages?contact=${id}`);
  };
  
  const handleProfileSave = (updatedProfile: any) => {
    setProfile(updatedProfile);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  // Create a ref to hold the ProfileEditor component
  const profileEditorRef = React.useRef<ProfileEditorRef>(null);
  
  return (
    <div className="min-h-screen bg-kiit-black">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left sidebar */}
            <div className="lg:col-span-1">
              <GlassCard 
                animation="fade" 
                delay={100} 
                className="overflow-hidden"
              >
                <div className="relative h-32 bg-gradient-to-r from-kiit-gold/20 to-kiit-gold/5">
                  {isOwnProfile && (
                    <button 
                      className="absolute top-3 right-3 p-2 bg-black/20 rounded-full text-white/70 hover:text-white hover:bg-black/40 transition-colors"
                      aria-label="Edit cover photo"
                    >
                      <Edit size={16} />
                    </button>
                  )}
                </div>
                
                <div className="px-6 pb-6">
                  <div className="flex justify-center -mt-12 mb-4">
                    {profile.avatar ? (
                      <img
                        src={profile.avatar}
                        alt={profile.name}
                        className="w-24 h-24 rounded-full border-4 border-kiit-darkgray object-cover"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-kiit-gold/50 to-kiit-gold/80 flex items-center justify-center text-2xl font-medium text-white border-4 border-kiit-darkgray">
                        {initials}
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center mb-6">
                    <h1 className="text-xl font-bold text-white">{profile.name}</h1>
                    <p className="text-white/70">{profile.headline}</p>
                    
                    {profile.location && (
                      <div className="flex items-center justify-center mt-2 text-white/60 text-sm">
                        <MapPin size={14} className="mr-1" />
                        <span>{profile.location}</span>
                      </div>
                    )}
                  </div>
                  
                  {!isOwnProfile && (
                    <div className="flex justify-center space-x-2 mb-6">
                      {isConnected ? (
                        <AnimatedButton 
                          variant="primary" 
                          size="sm"
                          onClick={handleMessage}
                        >
                          <MessageSquare size={14} className="mr-2" />
                          Message
                        </AnimatedButton>
                      ) : (
                        <AnimatedButton 
                          variant="primary" 
                          size="sm"
                          disabled={isPending}
                          onClick={handleConnect}
                        >
                          <Users size={14} className="mr-2" />
                          {isPending ? "Request Sent" : "Connect"}
                        </AnimatedButton>
                      )}
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    {profile.contact.email && (
                      <div className="flex items-center text-sm">
                        <Mail size={14} className="text-white/50 mr-3 flex-shrink-0" />
                        <span className="text-white/90">{profile.contact.email}</span>
                      </div>
                    )}
                    
                    {profile.contact.phone && (
                      <div className="flex items-center text-sm">
                        <Phone size={14} className="text-white/50 mr-3 flex-shrink-0" />
                        <span className="text-white/90">{profile.contact.phone}</span>
                      </div>
                    )}
                    
                    {profile.contact.website && (
                      <div className="flex items-center text-sm">
                        <Globe size={14} className="text-white/50 mr-3 flex-shrink-0" />
                        <a 
                          href={profile.contact.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-kiit-gold hover:text-kiit-lightgold transition-colors"
                        >
                          {profile.contact.website.replace(/(^\w+:|^)\/\//, '')}
                        </a>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex justify-center space-x-3">
                      {profile.social.linkedin && (
                        <a 
                          href={`https://linkedin.com/in/${profile.social.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-white/60 hover:text-kiit-gold transition-colors rounded-full hover:bg-white/5"
                          aria-label="LinkedIn"
                        >
                          <Linkedin size={18} />
                        </a>
                      )}
                      
                      {profile.social.twitter && (
                        <a 
                          href={`https://twitter.com/${profile.social.twitter}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-white/60 hover:text-kiit-gold transition-colors rounded-full hover:bg-white/5"
                          aria-label="Twitter"
                        >
                          <Twitter size={18} />
                        </a>
                      )}
                      
                      {profile.social.github && (
                        <a 
                          href={`https://github.com/${profile.social.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-white/60 hover:text-kiit-gold transition-colors rounded-full hover:bg-white/5"
                          aria-label="GitHub"
                        >
                          <Github size={18} />
                        </a>
                      )}
                      
                      {profile.social.facebook && (
                        <a 
                          href={`https://facebook.com/${profile.social.facebook}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-white/60 hover:text-kiit-gold transition-colors rounded-full hover:bg-white/5"
                          aria-label="Facebook"
                        >
                          <Facebook size={18} />
                        </a>
                      )}
                      
                      <button className="p-2 text-white/60 hover:text-white transition-colors rounded-full hover:bg-white/5">
                        <Settings size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </GlassCard>
              
              <GlassCard 
                animation="fade" 
                delay={200} 
                className="mt-6" 
                title="Skills"
                titleRight={isOwnProfile && profileEditorRef.current ? 
                  <div onClick={() => profileEditorRef.current.handleEdit("skills")}>
                    <button
                      type="button"
                      className="p-1.5 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                    >
                      <Edit size={14} className="text-white/70" />
                    </button>
                  </div> : undefined
                }
              >
                <div className="px-6 pb-6">
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill) => (
                      <div 
                        key={skill.id}
                        className="px-3 py-1.5 rounded-full text-sm bg-white/5 text-white/80"
                      >
                        {skill.name}
                        {skill.level && (
                          <span className="ml-1 text-xs text-white/50">
                            • {skill.level}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </div>
            
            {/* Main content */}
            <div className="lg:col-span-2">
              <GlassCard animation="fade" delay={150} className="overflow-hidden">
                <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
                
                <div className="p-6">
                  {/* About tab */}
                  {activeTab === "about" && (
                    <div>
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                          <h2 className="text-white font-medium">About</h2>
                          {isOwnProfile && profileEditorRef.current && (
                            <div onClick={() => profileEditorRef.current.handleEdit("about")}>
                              <button
                                type="button"
                                className="p-1.5 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                              >
                                <Edit size={14} className="text-white/70" />
                              </button>
                            </div>
                          )}
                        </div>
                        <p className="text-white/70 whitespace-pre-line">{profile.bio}</p>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h2 className="text-white font-medium">Current</h2>
                          {isOwnProfile && profileEditorRef.current && (
                            <div onClick={() => profileEditorRef.current.handleEdit("experience")}>
                              <button
                                type="button"
                                className="p-1.5 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                              >
                                <Edit size={14} className="text-white/70" />
                              </button>
                            </div>
                          )}
                        </div>
                        <div className="space-y-4">
                          {profile.experience.filter(exp => exp.current).map((exp) => (
                            <div key={exp.id} className="flex">
                              <div className="mr-4 mt-1">
                                <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center">
                                  <Briefcase size={18} className="text-kiit-gold/70" />
                                </div>
                              </div>
                              <div>
                                <h3 className="text-white font-medium">{exp.role}</h3>
                                <p className="text-white/70">{exp.company}</p>
                                {exp.location && (
                                  <div className="flex items-center text-white/50 text-sm mt-1">
                                    <MapPin size={12} className="mr-1" />
                                    <span>{exp.location}</span>
                                  </div>
                                )}
                                <div className="text-white/50 text-sm mt-1">
                                  {exp.startDate} - Present
                                </div>
                                {exp.description && (
                                  <p className="text-white/70 mt-2 text-sm">{exp.description}</p>
                                )}
                              </div>
                            </div>
                          ))}
                          
                          {profile.education.slice(0, 1).map((edu) => (
                            <div key={edu.id} className="flex">
                              <div className="mr-4 mt-1">
                                <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center">
                                  <GraduationCap size={18} className="text-kiit-gold/70" />
                                </div>
                              </div>
                              <div>
                                <h3 className="text-white font-medium">{edu.degree} in {edu.department}</h3>
                                <p className="text-white/70">{edu.institution}</p>
                                <div className="text-white/50 text-sm mt-1">
                                  {edu.year}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Experience tab */}
                  {activeTab === "experience" && (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-white font-medium">Experience</h2>
                        {isOwnProfile && profileEditorRef.current && (
                            <div onClick={() => profileEditorRef.current.handleEdit("experience")}>
                              <button
                                type="button"
                                className="p-1.5 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                              >
                                <Edit size={14} className="text-white/70" />
                              </button>
                            </div>
                        )}
                      </div>
                      
                      <div className="space-y-8">
                        {profile.experience.map((exp) => (
                          <div key={exp.id} className="relative pl-6 border-l border-white/10">
                            <div className="absolute left-0 top-0 transform -translate-x-1/2 w-4 h-4 rounded-full bg-white/10 border-2 border-kiit-darkgray"></div>
                            
                            <div className="mb-1">
                              <div className="text-white font-medium">{exp.role}</div>
                              <div className="text-white/70">{exp.company}</div>
                            </div>
                            
                            <div className="flex items-center text-white/50 text-sm mb-2">
                              {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                              {exp.location && (
                                <>
                                  <span className="mx-2">•</span>
                                  <MapPin size={12} className="mr-1" />
                                  {exp.location}
                                </>
                              )}
                            </div>
                            
                            {exp.description && (
                              <p className="text-white/70 text-sm">{exp.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Education tab */}
                  {activeTab === "education" && (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-white font-medium">Education</h2>
                        {isOwnProfile && profileEditorRef.current && (
                            <div onClick={() => profileEditorRef.current.handleEdit("education")}>
                              <button
                                type="button"
                                className="p-1.5 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                              >
                                <Edit size={14} className="text-white/70" />
                              </button>
                            </div>
                        )}
                      </div>
                      
                      <div className="space-y-8">
                        {profile.education.map((edu) => (
                          <div key={edu.id} className="relative pl-6 border-l border-white/10">
                            <div className="absolute left-0 top-0 transform -translate-x-1/2 w-4 h-4 rounded-full bg-white/10 border-2 border-kiit-darkgray"></div>
                            
                            <div className="mb-1">
                              <div className="text-white font-medium">{edu.degree} in {edu.department}</div>
                              <div className="text-white/70">{edu.institution}</div>
                            </div>
                            
                            <div className="text-white/50 text-sm mb-2">
                              {edu.year}
                            </div>
                            
                            {edu.description && (
                              <p className="text-white/70 text-sm">{edu.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Skills tab */}
                  {activeTab === "skills" && (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-white font-medium">Skills</h2>
                        {isOwnProfile && profileEditorRef.current && (
                            <div onClick={() => profileEditorRef.current.handleEdit("skills")}>
                              <button
                                type="button"
                                className="p-1.5 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                              >
                                <Edit size={14} className="text-white/70" />
                              </button>
                            </div>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { level: "Expert", color: "bg-green-500" },
                          { level: "Advanced", color: "bg-blue-500" },
                          { level: "Intermediate", color: "bg-yellow-500" },
                          { level: "Beginner", color: "bg-orange-500" },
                        ].map((category) => (
                          <div key={category.level} className="space-y-3">
                            <h3 className="flex items-center text-sm font-medium text-white/80">
                              <span className={`inline-block w-2 h-2 ${category.color} rounded-full mr-2`}></span>
                              {category.level}
                            </h3>
                            
                            <div className="flex flex-wrap gap-2">
                              {profile.skills
                                .filter((skill) => skill.level === category.level)
                                .map((skill) => (
                                  <div
                                    key={skill.id}
                                    className="px-3 py-1.5 rounded-full text-sm bg-white/5 text-white/80"
                                  >
                                    {skill.name}
                                  </div>
                                ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Achievements tab */}
                  {activeTab === "achievements" && (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-white font-medium">Achievements</h2>
                        {isOwnProfile && profileEditorRef.current && (
                            <div onClick={() => profileEditorRef.current.handleEdit("achievements")}>
                              <button
                                type="button"
                                className="p-1.5 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                              >
                                <Edit size={14} className="text-white/70" />
                              </button>
                            </div>
                        )}
                      </div>
                      
                      <div className="space-y-6">
                        {profile.achievements.map((achievement) => (
                          <div key={achievement.id} className="flex">
                            <div className="mr-4 mt-1">
                              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                <Award size={18} className="text-kiit-gold" />
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center">
                                <h3 className="text-white font-medium">{achievement.title}</h3>
                                <span className="text-white/50 text-sm ml-2">• {achievement.year}</span>
                              </div>
                              {achievement.description && (
                                <p className="text-white/70 mt-1">{achievement.description}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
      
      {/* Profile Editor Component - Only shown when it's the user's own profile */}
      {isOwnProfile && (
        <ProfileEditor 
          ref={profileEditorRef}
          profileData={profile} 
          onSave={handleProfileSave} 
        />
      )}
      
      <Footer />
    </div>
  );
};

export default Profile;
