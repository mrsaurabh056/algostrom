
import { Message } from '../model/message.model.js';
import { Conversation } from '../model/conversation.model.js';

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    }).sort({ createdAt: 'asc' });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching messages.' });
  }
};

export const sendMessage = async (req, res) => {
  const { conversationId, content } = req.body; 
  const user = req.user; // Get user from auth middleware

  if (!conversationId || !content) {
    return res.status(400).json({ message: 'Conversation ID and content are required.' });
  }

  try {
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found.' });
    }
    
    // Ensure the user sending the message is a participant of the conversation
    if (!conversation.participants.includes(user._id)) {
        return res.status(403).json({ message: 'User is not a participant of this conversation.' });
    }

    const senderType = user.role === 'admin' ? 'Admin' : 'Student';
    const senderId = user.role === 'admin' ? user._id : null;

    const newMessage = new Message({ conversationId, content, senderType, senderId });
    const savedMessage = await newMessage.save();

    conversation.lastMessageAt = new Date();
    await conversation.save();

    const io = req.app.get('socketio');
    io.to(conversationId).emit('newMessage', savedMessage);

    res.status(201).json(savedMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: 'Server error while sending message.' });
  }
};
