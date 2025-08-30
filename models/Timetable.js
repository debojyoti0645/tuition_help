const mongoose = require('mongoose');

const TimetableSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  day: { type: String, required: true }, // e.g. "Monday"
  startTime: { type: String, required: true }, // e.g. "17:00"
  duration: { type: Number, default: 60 }, // duration in minutes
  subject: { type: String },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Timetable', TimetableSchema);