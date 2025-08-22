import { Router } from 'express';
import { getMessages, sendMessage } from '../controller/message.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const messageRouter = Router();

// A user must be logged in to get messages or send them
messageRouter.get('/:conversationId', protect, getMessages);
messageRouter.post('/', protect, sendMessage);

export default messageRouter;
