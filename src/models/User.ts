
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

// Check models object exists (for browser compatibility)
const modelExists = mongoose.models && 'User' in mongoose.models;
const User = modelExists ? mongoose.models.User : mongoose.model('User', UserSchema);

export default User;
