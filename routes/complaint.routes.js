import { Router } from 'express';
import { createComplaint, getComplaintByToken } from '../controller/complaint.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const complaintRouter = Router();

// A user must be logged in to create a complaint
complaintRouter.post('/', protect, createComplaint);

complaintRouter.get('/:token', getComplaintByToken);

export default complaintRouter;