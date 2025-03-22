
import React, { forwardRef, useImperativeHandle } from "react";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  X 
} from "lucide-react";
import AnimatedButton from "../ui/AnimatedButton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

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

interface Contact {
  email: string;
  phone: string;
  website: string;
}

interface Social {
  linkedin: string;
  twitter: string;
  github: string;
  facebook: string;
}

interface ProfileData {
  name: string;
  headline: string;
  location: string;
  bio: string;
  contact: Contact;
  social: Social;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  achievements: Achievement[];
  avatar?: string | null;
}

type EditableSection = "about" | "contact" | "social" | "education" | "experience" | "skills" | "achievements";

interface ProfileEditorProps {
  profileData: ProfileData;
  onSave: (data: ProfileData) => void;
}

// Define what methods we want to expose via the ref
export interface ProfileEditorRef {
  handleEdit: (section: EditableSection) => void;
}

const ProfileEditor = forwardRef<ProfileEditorRef, ProfileEditorProps>(
  ({ profileData, onSave }, ref) => {
    const [isEditing, setIsEditing] = React.useState<EditableSection | null>(null);
    const [editData, setEditData] = React.useState<any>(null);
    
    // For new items
    const [newSkill, setNewSkill] = React.useState("");
    const [newSkillLevel, setNewSkillLevel] = React.useState<"Beginner" | "Intermediate" | "Advanced" | "Expert">("Intermediate");
    
    const generateId = () => {
      return Math.random().toString(36).substr(2, 9);
    };
    
    // Expose the handleEdit method via ref
    useImperativeHandle(ref, () => ({
      handleEdit: (section: EditableSection) => {
        handleEdit(section);
      }
    }));

    const handleEdit = (section: EditableSection) => {
      setIsEditing(section);
      
      switch (section) {
        case "about":
          setEditData({
            name: profileData.name,
            headline: profileData.headline,
            location: profileData.location,
            bio: profileData.bio,
          });
          break;
        case "contact":
          setEditData({ ...profileData.contact });
          break;
        case "social":
          setEditData({ ...profileData.social });
          break;
        case "education":
          setEditData([...profileData.education]);
          break;
        case "experience":
          setEditData([...profileData.experience]);
          break;
        case "skills":
          setEditData([...profileData.skills]);
          break;
        case "achievements":
          setEditData([...profileData.achievements]);
          break;
      }
    };

    const handleSave = () => {
      const updatedData = { ...profileData };
      
      switch (isEditing) {
        case "about":
          updatedData.name = editData.name;
          updatedData.headline = editData.headline;
          updatedData.location = editData.location;
          updatedData.bio = editData.bio;
          break;
        case "contact":
          updatedData.contact = editData;
          break;
        case "social":
          updatedData.social = editData;
          break;
        case "education":
          updatedData.education = editData;
          break;
        case "experience":
          updatedData.experience = editData;
          break;
        case "skills":
          updatedData.skills = editData;
          break;
        case "achievements":
          updatedData.achievements = editData;
          break;
      }
      
      onSave(updatedData);
      setIsEditing(null);
      setEditData(null);
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    };

    const handleCancel = () => {
      setIsEditing(null);
      setEditData(null);
    };

    // Helper functions for arrays
    const addEducation = () => {
      setEditData([
        ...editData,
        {
          id: generateId(),
          degree: "",
          institution: "",
          department: "",
          year: "",
        },
      ]);
    };

    const addExperience = () => {
      setEditData([
        ...editData,
        {
          id: generateId(),
          role: "",
          company: "",
          location: "",
          startDate: "",
          current: false,
        },
      ]);
    };

    const addSkill = () => {
      if (!newSkill.trim()) return;
      
      setEditData([
        ...editData,
        {
          id: generateId(),
          name: newSkill,
          level: newSkillLevel,
        },
      ]);
      
      setNewSkill("");
    };

    const addAchievement = () => {
      setEditData([
        ...editData,
        {
          id: generateId(),
          title: "",
          year: "",
        },
      ]);
    };

    const removeItem = (id: string) => {
      setEditData(editData.filter((item: any) => item.id !== id));
    };

    const updateItem = (id: string, field: string, value: any) => {
      setEditData(
        editData.map((item: any) => {
          if (item.id === id) {
            return { ...item, [field]: value };
          }
          return item;
        })
      );
    };

    // Render appropriate edit form based on section
    const renderEditForm = () => {
      if (!isEditing || !editData) return null;
      
      switch (isEditing) {
        case "about":
          return (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-white/80">Name</Label>
                <Input 
                  id="name" 
                  value={editData.name}
                  onChange={e => setEditData({ ...editData, name: e.target.value })}
                  className="bg-kiit-black border-white/10 text-white mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="headline" className="text-white/80">Headline</Label>
                <Input 
                  id="headline" 
                  value={editData.headline}
                  onChange={e => setEditData({ ...editData, headline: e.target.value })}
                  className="bg-kiit-black border-white/10 text-white mt-1"
                  placeholder="Software Engineer at Google"
                />
              </div>
              
              <div>
                <Label htmlFor="location" className="text-white/80">Location</Label>
                <Input 
                  id="location" 
                  value={editData.location}
                  onChange={e => setEditData({ ...editData, location: e.target.value })}
                  className="bg-kiit-black border-white/10 text-white mt-1"
                  placeholder="San Francisco, CA"
                />
              </div>
              
              <div>
                <Label htmlFor="bio" className="text-white/80">Bio</Label>
                <Textarea 
                  id="bio" 
                  value={editData.bio}
                  onChange={e => setEditData({ ...editData, bio: e.target.value })}
                  className="bg-kiit-black border-white/10 text-white mt-1"
                  rows={4}
                />
              </div>
            </div>
          );
          
        case "contact":
          return (
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-white/80">Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={editData.email}
                  onChange={e => setEditData({ ...editData, email: e.target.value })}
                  className="bg-kiit-black border-white/10 text-white mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="phone" className="text-white/80">Phone</Label>
                <Input 
                  id="phone" 
                  value={editData.phone}
                  onChange={e => setEditData({ ...editData, phone: e.target.value })}
                  className="bg-kiit-black border-white/10 text-white mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="website" className="text-white/80">Website</Label>
                <Input 
                  id="website" 
                  value={editData.website}
                  onChange={e => setEditData({ ...editData, website: e.target.value })}
                  className="bg-kiit-black border-white/10 text-white mt-1"
                  placeholder="https://example.com"
                />
              </div>
            </div>
          );
          
        case "social":
          return (
            <div className="space-y-4">
              <div>
                <Label htmlFor="linkedin" className="text-white/80">LinkedIn</Label>
                <Input 
                  id="linkedin" 
                  value={editData.linkedin}
                  onChange={e => setEditData({ ...editData, linkedin: e.target.value })}
                  className="bg-kiit-black border-white/10 text-white mt-1"
                  placeholder="username"
                />
              </div>
              
              <div>
                <Label htmlFor="twitter" className="text-white/80">Twitter</Label>
                <Input 
                  id="twitter" 
                  value={editData.twitter}
                  onChange={e => setEditData({ ...editData, twitter: e.target.value })}
                  className="bg-kiit-black border-white/10 text-white mt-1"
                  placeholder="username"
                />
              </div>
              
              <div>
                <Label htmlFor="github" className="text-white/80">GitHub</Label>
                <Input 
                  id="github" 
                  value={editData.github}
                  onChange={e => setEditData({ ...editData, github: e.target.value })}
                  className="bg-kiit-black border-white/10 text-white mt-1"
                  placeholder="username"
                />
              </div>
              
              <div>
                <Label htmlFor="facebook" className="text-white/80">Facebook</Label>
                <Input 
                  id="facebook" 
                  value={editData.facebook}
                  onChange={e => setEditData({ ...editData, facebook: e.target.value })}
                  className="bg-kiit-black border-white/10 text-white mt-1"
                  placeholder="username"
                />
              </div>
            </div>
          );
          
        case "education":
          return (
            <div className="space-y-4">
              {editData.map((edu: Education, index: number) => (
                <div key={edu.id} className="p-4 bg-kiit-black/60 rounded-lg border border-white/10 relative">
                  <button
                    type="button"
                    onClick={() => removeItem(edu.id)}
                    className="absolute top-2 right-2 p-1 text-white/60 hover:text-white rounded-full hover:bg-white/10"
                  >
                    <Trash2 size={16} />
                  </button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor={`degree-${index}`} className="text-white/80">Degree</Label>
                      <Input
                        id={`degree-${index}`}
                        value={edu.degree}
                        onChange={e => updateItem(edu.id, "degree", e.target.value)}
                        className="bg-kiit-black border-white/10 text-white mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`department-${index}`} className="text-white/80">Department</Label>
                      <Input
                        id={`department-${index}`}
                        value={edu.department}
                        onChange={e => updateItem(edu.id, "department", e.target.value)}
                        className="bg-kiit-black border-white/10 text-white mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`institution-${index}`} className="text-white/80">Institution</Label>
                      <Input
                        id={`institution-${index}`}
                        value={edu.institution}
                        onChange={e => updateItem(edu.id, "institution", e.target.value)}
                        className="bg-kiit-black border-white/10 text-white mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`year-${index}`} className="text-white/80">Year</Label>
                      <Input
                        id={`year-${index}`}
                        value={edu.year}
                        onChange={e => updateItem(edu.id, "year", e.target.value)}
                        className="bg-kiit-black border-white/10 text-white mt-1"
                        placeholder="2018-2022"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <Label htmlFor={`edu-desc-${index}`} className="text-white/80">Description</Label>
                      <Textarea
                        id={`edu-desc-${index}`}
                        value={edu.description || ""}
                        onChange={e => updateItem(edu.id, "description", e.target.value)}
                        className="bg-kiit-black border-white/10 text-white mt-1"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full flex items-center justify-center gap-1 border-dashed"
                onClick={addEducation}
              >
                <Plus size={16} /> Add Education
              </Button>
            </div>
          );
          
        case "experience":
          return (
            <div className="space-y-4">
              {editData.map((exp: Experience, index: number) => (
                <div key={exp.id} className="p-4 bg-kiit-black/60 rounded-lg border border-white/10 relative">
                  <button
                    type="button"
                    onClick={() => removeItem(exp.id)}
                    className="absolute top-2 right-2 p-1 text-white/60 hover:text-white rounded-full hover:bg-white/10"
                  >
                    <Trash2 size={16} />
                  </button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor={`role-${index}`} className="text-white/80">Role</Label>
                      <Input
                        id={`role-${index}`}
                        value={exp.role}
                        onChange={e => updateItem(exp.id, "role", e.target.value)}
                        className="bg-kiit-black border-white/10 text-white mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`company-${index}`} className="text-white/80">Company</Label>
                      <Input
                        id={`company-${index}`}
                        value={exp.company}
                        onChange={e => updateItem(exp.id, "company", e.target.value)}
                        className="bg-kiit-black border-white/10 text-white mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`location-${index}`} className="text-white/80">Location</Label>
                      <Input
                        id={`location-${index}`}
                        value={exp.location || ""}
                        onChange={e => updateItem(exp.id, "location", e.target.value)}
                        className="bg-kiit-black border-white/10 text-white mt-1"
                        placeholder="San Francisco, CA"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`startDate-${index}`} className="text-white/80">Start Date</Label>
                      <Input
                        id={`startDate-${index}`}
                        value={exp.startDate}
                        onChange={e => updateItem(exp.id, "startDate", e.target.value)}
                        className="bg-kiit-black border-white/10 text-white mt-1"
                        placeholder="Jan 2022"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2 pt-6">
                      <input
                        type="checkbox"
                        id={`current-${index}`}
                        checked={exp.current}
                        onChange={e => updateItem(exp.id, "current", e.target.checked)}
                        className="h-4 w-4 rounded bg-kiit-black border-white/30 text-kiit-gold focus:ring-kiit-gold/50"
                      />
                      <Label htmlFor={`current-${index}`} className="text-white/80">Current Position</Label>
                    </div>
                    
                    {!exp.current && (
                      <div>
                        <Label htmlFor={`endDate-${index}`} className="text-white/80">End Date</Label>
                        <Input
                          id={`endDate-${index}`}
                          value={exp.endDate || ""}
                          onChange={e => updateItem(exp.id, "endDate", e.target.value)}
                          className="bg-kiit-black border-white/10 text-white mt-1"
                          placeholder="Dec 2023"
                        />
                      </div>
                    )}
                    
                    <div className="md:col-span-2">
                      <Label htmlFor={`exp-desc-${index}`} className="text-white/80">Description</Label>
                      <Textarea
                        id={`exp-desc-${index}`}
                        value={exp.description || ""}
                        onChange={e => updateItem(exp.id, "description", e.target.value)}
                        className="bg-kiit-black border-white/10 text-white mt-1"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full flex items-center justify-center gap-1 border-dashed"
                onClick={addExperience}
              >
                <Plus size={16} /> Add Experience
              </Button>
            </div>
          );
          
        case "skills":
          return (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {editData.map((skill: Skill) => (
                  <div 
                    key={skill.id} 
                    className="px-3 py-1.5 rounded-full bg-kiit-black/60 border border-white/10 text-white flex items-center gap-2"
                  >
                    <span>{skill.name}</span>
                    {skill.level && (
                      <span className="text-xs text-white/50">• {skill.level}</span>
                    )}
                    <button
                      type="button"
                      onClick={() => removeItem(skill.id)}
                      className="p-0.5 text-white/60 hover:text-white rounded-full hover:bg-white/10"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    value={newSkill}
                    onChange={e => setNewSkill(e.target.value)}
                    className="bg-kiit-black border-white/10 text-white"
                    placeholder="Add a skill (e.g. JavaScript)"
                    onKeyPress={e => e.key === 'Enter' && addSkill()}
                  />
                </div>
                
                <select
                  value={newSkillLevel}
                  onChange={e => setNewSkillLevel(e.target.value as any)}
                  className="bg-kiit-black text-white border border-white/10 rounded px-3"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
                
                <Button 
                  type="button" 
                  onClick={addSkill}
                  className="bg-kiit-gold hover:bg-kiit-gold/80 text-black"
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>
          );
          
        case "achievements":
          return (
            <div className="space-y-4">
              {editData.map((achievement: Achievement, index: number) => (
                <div key={achievement.id} className="p-4 bg-kiit-black/60 rounded-lg border border-white/10 relative">
                  <button
                    type="button"
                    onClick={() => removeItem(achievement.id)}
                    className="absolute top-2 right-2 p-1 text-white/60 hover:text-white rounded-full hover:bg-white/10"
                  >
                    <Trash2 size={16} />
                  </button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor={`title-${index}`} className="text-white/80">Title</Label>
                      <Input
                        id={`title-${index}`}
                        value={achievement.title}
                        onChange={e => updateItem(achievement.id, "title", e.target.value)}
                        className="bg-kiit-black border-white/10 text-white mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`year-${index}`} className="text-white/80">Year</Label>
                      <Input
                        id={`year-${index}`}
                        value={achievement.year}
                        onChange={e => updateItem(achievement.id, "year", e.target.value)}
                        className="bg-kiit-black border-white/10 text-white mt-1"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <Label htmlFor={`ach-desc-${index}`} className="text-white/80">Description</Label>
                      <Textarea
                        id={`ach-desc-${index}`}
                        value={achievement.description || ""}
                        onChange={e => updateItem(achievement.id, "description", e.target.value)}
                        className="bg-kiit-black border-white/10 text-white mt-1"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full flex items-center justify-center gap-1 border-dashed"
                onClick={addAchievement}
              >
                <Plus size={16} /> Add Achievement
              </Button>
            </div>
          );
          
        default:
          return null;
      }
    };

    return (
      <Dialog open={!!isEditing} onOpenChange={() => isEditing && handleCancel()}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-kiit-darkgray border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">
              {isEditing === "about" && "Edit Basic Information"}
              {isEditing === "contact" && "Edit Contact Information"}
              {isEditing === "social" && "Edit Social Links"}
              {isEditing === "education" && "Edit Education"}
              {isEditing === "experience" && "Edit Experience"}
              {isEditing === "skills" && "Edit Skills"}
              {isEditing === "achievements" && "Edit Achievements"}
            </DialogTitle>
            <DialogDescription className="text-white/70">
              Make changes to your profile information below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4">
            {renderEditForm()}
          </div>
          
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleSave} className="bg-kiit-gold hover:bg-kiit-gold/80 text-black">
              <Check size={14} className="mr-1" /> Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
);

ProfileEditor.displayName = "ProfileEditor";

export { ProfileEditor, type ProfileData, type ProfileEditorRef };
export default ProfileEditor;
