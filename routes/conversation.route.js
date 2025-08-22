import { Router } from 'express';
import { findOrCreateConversation } from '../controller/conversation.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const conversationRouter = Router();

// This route will find an existing conversation or create a new one
conversationRouter.post('/', protect, findOrCreateConversation);

export default conversationRouter;
