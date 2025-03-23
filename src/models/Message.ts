
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

export default mongoose.models.Message || mongoose.model('Message', MessageSchema);
