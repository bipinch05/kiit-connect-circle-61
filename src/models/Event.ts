
import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: String,
  date: {
    type: Date,
    required: true,
  },
  startTime: String,
  endTime: String,
  location: String,
  isOnline: Boolean,
  organizer: String,
  attendeeCount: {
    type: Number,
    default: 0,
  },
  maxAttendees: Number,
  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Event || mongoose.model('Event', EventSchema);
