const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");

// POST /api/payments
router.post("/", async (req, res, next) => {
  try {
    const p = new Payment(req.body);
    await p.save();
    res.status(201).json(p);
  } catch (err) {
    next(err);
  }
});

// GET /api/payments  optionally filter ?studentId=<id>
router.get("/", async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.studentId) filter.studentId = req.query.studentId;
    const items = await Payment.find(filter).sort({ date: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
});

// GET /api/payments/:id
router.get("/:id", async (req, res, next) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json(payment);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
