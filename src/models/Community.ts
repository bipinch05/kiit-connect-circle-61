
import mongoose from 'mongoose';

const CommunitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  image: String,
  members: {
    type: Number,
    default: 0,
  },
  membersList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Check models object exists (for browser compatibility)
const modelExists = mongoose.models && 'Community' in mongoose.models;
const Community = modelExists ? mongoose.models.Community : mongoose.model('Community', CommunitySchema);

export default Community;
