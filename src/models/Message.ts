
import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  senderName: String,
  recipient: {
    type: String,
    required: true,
  },
  subject: String,
  message: String,
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Read', 'Unread'],
    default: 'Unread',
  },
});

// Check models object exists (for browser compatibility)
const modelExists = mongoose.models && 'Message' in mongoose.models;
const Message = modelExists ? mongoose.models.Message : mongoose.model('Message', MessageSchema);

export default Message;
