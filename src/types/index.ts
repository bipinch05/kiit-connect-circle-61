
// User type definition
export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  company?: string;
  location?: string;
  graduationYear?: number;
  department?: string;
  skills?: string[];
  bio?: string;
  isAdmin: boolean;
  createdAt: Date;
}

// Event type definition
export interface Event {
  _id: string;
  title: string;
  description?: string;
  image?: string;
  date: Date;
  startTime?: string;
  endTime?: string;
  location?: string;
  isOnline?: boolean;
  organizer?: string;
  attendeeCount: number;
  maxAttendees?: number;
  attendees?: string[];
  createdAt: Date;
}

// Community type definition
export interface Community {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  members: number;
  membersList?: string[];
  createdAt: Date;
}

// Message type definition
export interface Message {
  _id: string;
  sender: string;
  senderName?: string;
  recipient: string;
  subject?: string;
  message?: string;
  date: Date;
  status: 'Read' | 'Unread';
}
