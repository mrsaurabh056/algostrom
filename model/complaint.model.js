import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Academic', 'Hostel', 'Infrastructure', 'Faculty', 'Other'],
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved', 'Rejected'],
    default: 'Pending',
  },
  // The key to anonymity. This is NOT a reference to the User model.
  trackingToken: {
    type: String,
    required: true,
    unique: true,
    index: true, // Improves query performance for finding by token
  },
}, { timestamps: true });

export const Complaint = mongoose.model('Complaint', complaintSchema);
