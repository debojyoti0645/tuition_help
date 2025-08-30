const mongoose = require('mongoose');

const WeeklyClassSchema = new mongoose.Schema({
  day: String,   // e.g. "Mon"
  time: String,  // e.g. "17:00"
}, { _id: false });

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  batch: String,
  joinDate: { type: Date, default: Date.now },
  weeklySchedule: { type: [WeeklyClassSchema], default: [] }
});

module.exports = mongoose.model('Student', StudentSchema);
