
import mongoose from 'mongoose';

const emailSchema = new mongoose.Schema({
  to: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  sentAt: {
    type: Date,
    default: Date.now
  }
});

const Email = mongoose.model('Email', emailSchema);

export default Email;