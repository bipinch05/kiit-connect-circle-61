
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import Event from '@/models/Event';
import Community from '@/models/Community';
import Message from '@/models/Message';
import { User as UserType, Event as EventType, Community as CommunityType, Message as MessageType } from '@/types';

// User related API functions
export const fetchUsers = async (filters = {}): Promise<UserType[]> => {
  try {
    await connectToDatabase();
    return await User.find(filters).lean();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const fetchUserById = async (id: string): Promise<UserType | null> => {
  try {
    await connectToDatabase();
    return await User.findById(id).lean();
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error);
    throw error;
  }
};

// Event related API functions
export const fetchEvents = async (filters = {}): Promise<EventType[]> => {
  try {
    await connectToDatabase();
    return await Event.find(filters).lean();
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const fetchEventById = async (id: string): Promise<EventType | null> => {
  try {
    await connectToDatabase();
    return await Event.findById(id).lean();
  } catch (error) {
    console.error(`Error fetching event with id ${id}:`, error);
    throw error;
  }
};

// Community related API functions
export const fetchCommunities = async (filters = {}): Promise<CommunityType[]> => {
  try {
    await connectToDatabase();
    return await Community.find(filters).lean();
  } catch (error) {
    console.error('Error fetching communities:', error);
    throw error;
  }
};

export const fetchCommunityById = async (id: string): Promise<CommunityType | null> => {
  try {
    await connectToDatabase();
    return await Community.findById(id).lean();
  } catch (error) {
    console.error(`Error fetching community with id ${id}:`, error);
    throw error;
  }
};

// Message related API functions
export const fetchMessages = async (filters = {}): Promise<MessageType[]> => {
  try {
    await connectToDatabase();
    return await Message.find(filters).lean();
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

export const fetchMessageById = async (id: string): Promise<MessageType | null> => {
  try {
    await connectToDatabase();
    return await Message.findById(id).lean();
  } catch (error) {
    console.error(`Error fetching message with id ${id}:`, error);
    throw error;
  }
};
