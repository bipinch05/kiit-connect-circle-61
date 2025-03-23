
import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: String,
  description: String,
  type: String, // Full-time, Part-time, Contract, etc.
  salary: String,
  requirements: [String],
  responsibilities: [String],
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  postedDate: {
    type: Date,
    default: Date.now,
  },
  applications: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['Active', 'Closed', 'Pending'],
    default: 'Active',
  },
  applyUrl: String,
  contactEmail: String,
});

// Check models object exists (for browser compatibility)
const modelExists = mongoose.models && 'Job' in mongoose.models;
const Job = modelExists ? mongoose.models.Job : mongoose.model('Job', JobSchema);

export default Job;
