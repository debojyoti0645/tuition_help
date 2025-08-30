const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  date: { type: Date, required: true },
  type: { type: String, enum: ['regular', 'extra'], default: 'regular' }
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
