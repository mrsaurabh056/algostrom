
import { Complaint } from '../model/complaint.model.js';
import { v4 as uuidv4 } from 'uuid';

export const createComplaint = async (req, res) => {
  const { title, description, category } = req.body;
  const userId = req.user._id; // From authMiddleware

  try {
    const trackingToken = uuidv4();

    const complaint = await Complaint.create({
      title,
      description,
      category,
      trackingToken,
      postedBy: userId,
    });

    res.status(201).json({
      message: 'Complaint created successfully.',
      trackingToken: complaint.trackingToken,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error while creating complaint.' });
  }
};

export const getComplaintByToken = async (req, res) => {
    try {
        const complaint = await Complaint.findOne({ trackingToken: req.params.token });
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found.' });
        }
        // Here you can decide if you want to check if the user is the owner or an admin
        res.json(complaint);
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};


