import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
  // Link directly to the complaint document for stronger data integrity and population
  complaintId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Complaint',
    required: true,
    unique: true, // A complaint should only have one conversation
    index: true,
  },
  // An array to hold all participants (student and admins)
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],
  // The status of the conversation
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open',
  },
  // To quickly see when the last activity was
  lastMessageAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export const Conversation = mongoose.model('Conversation', conversationSchema);