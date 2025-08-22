import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  // Identifies the role of the sender for the frontend UI.
  senderType: {
    type: String,
    enum: ['Student', 'Admin'],
    required: true,
  },
  // Stores the user ID ONLY if the sender is an admin.
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null, // Remains null for students, preserving anonymity.
  },
}, { timestamps: true });

export const Message = mongoose.model('Message', messageSchema);
