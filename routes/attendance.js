const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

// POST /api/attendance
router.post('/', async (req, res, next) => {
  try {
    const a = new Attendance(req.body);
    await a.save();
    res.status(201).json(a);
  } catch (err) { next(err); }
});

// GET /api/attendance?studentId=...
router.get('/', async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.studentId) filter.studentId = req.query.studentId;
    const items = await Attendance.find(filter).sort({ date: -1 });
    res.json(items);
  } catch (err) { next(err); }
});

// GET /api/attendance/student/:id
router.get('/student/:id', async (req, res, next) => {
  try {
    const studentId = req.params.id;
    const attendance = await Attendance.find({ studentId }).sort({ date: -1 });
    
    if (!attendance) {
      return res.status(404).json({ message: 'No attendance records found for this student' });
    }
    
    res.json(attendance);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
