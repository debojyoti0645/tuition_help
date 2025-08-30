const express = require('express');
const router = express.Router();
const Timetable = require('../models/Timetable');

// GET /api/timetable
router.get('/', async (req, res, next) => {
  try {
    const timetable = await Timetable.find()
      .populate('studentId', 'name')
      .sort('day startTime');
    res.json(timetable);
  } catch (err) {
    next(err);
  }
});

// GET /api/timetable/:id
router.get('/:id', async (req, res, next) => {
  try {
    const timetable = await Timetable.findById(req.params.id)
      .populate('studentId', 'name');
    if (!timetable) {
      return res.status(404).json({ message: 'Timetable entry not found' });
    }
    res.json(timetable);
  } catch (err) {
    next(err);
  }
});

// POST /api/timetable
router.post('/', async (req, res, next) => {
  try {
    const timetable = new Timetable(req.body);
    await timetable.save();
    res.status(201).json(timetable);
  } catch (err) {
    next(err);
  }
});

// PUT /api/timetable/:id
router.put('/:id', async (req, res, next) => {
  try {
    const timetable = await Timetable.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('studentId', 'name');

    if (!timetable) {
      return res.status(404).json({ message: 'Timetable entry not found' });
    }

    res.json(timetable);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/timetable/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const timetable = await Timetable.findByIdAndDelete(req.params.id);
    
    if (!timetable) {
      return res.status(404).json({ message: 'Timetable entry not found' });
    }

    res.json({ message: 'Timetable entry deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;