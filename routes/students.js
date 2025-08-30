const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// GET /api/students
router.get('/', async (req, res, next) => {
  try {
    const students = await Student.find().sort('name');
    res.json(students);
  } catch (err) { next(err); }
});

// POST /api/students
router.post('/', async (req, res, next) => {
  try {
    const s = new Student(req.body);
    await s.save();
    res.status(201).json(s);
  } catch (err) { next(err); }
});

// GET /api/students/:id
router.get('/:id', async (req, res, next) => {
  try {
    const s = await Student.findById(req.params.id);
    if (!s) return res.status(404).json({ message: 'Not found' });
    res.json(s);
  } catch (err) { next(err); }
});

// PUT /api/students/:id
router.put('/:id', async (req, res, next) => {
  try {
    const s = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(s);
  } catch (err) { next(err); }
});

// DELETE /api/students/:id
router.delete('/:id', async (req, res, next) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
});

module.exports = router;
