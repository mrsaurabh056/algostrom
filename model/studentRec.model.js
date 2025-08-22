import mongoose from "mongoose";
const studentRecordSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
  }
});

export const StudentRecord = mongoose.model('StudentRecord', studentRecordSchema);


