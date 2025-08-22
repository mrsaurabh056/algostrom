import { Conversation } from '../model/conversation.model.js';
import { Complaint } from '../model/complaint.model.js';

/**
 * @description Find an existing conversation or create a new one for a complaint.
 * @route POST /api/conversations
 */
export const findOrCreateConversation = async (req, res) => {
    const { complaintToken } = req.body;
    const adminId = req.user._id; // from auth middleware

    try {
        const complaint = await Complaint.findOne({ trackingToken: complaintToken });
        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }

        // Check if a conversation already exists for this complaint's ID
        let conversation = await Conversation.findOne({ complaintId: complaint._id });

        if (conversation) {
            // If admin is not already a participant, add them
            if (!conversation.participants.includes(adminId)) {
                conversation.participants.push(adminId);
                await conversation.save();
            }
        } else {
            // Create a new conversation if it doesn't exist
            conversation = await Conversation.create({
                complaintId: complaint._id,
                participants: [complaint.postedBy, adminId] // Student and the first admin
            });
        }
        res.status(200).json(conversation);
    } catch (error) {
        console.error("Error finding or creating conversation:", error);
        res.status(500).json({ message: "Server error" });
    }
};
