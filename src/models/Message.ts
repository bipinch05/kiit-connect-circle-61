
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

// Use a safer approach to check if the model exists before creating it
const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema);

export default Message;
