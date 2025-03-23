
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: String,
  role: String,
  company: String,
  location: String,
  graduationYear: Number,
  department: String,
  skills: [String],
  bio: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Use a safer approach to check if the model exists before creating it
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
