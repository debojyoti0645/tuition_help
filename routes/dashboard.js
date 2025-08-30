const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Payment = require("../models/Payment");
const Attendance = require("../models/Attendance");

router.get("/", async (req, res, next) => {
  try {
    const studentsCount = await Student.countDocuments();
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const payments = await Payment.aggregate([
      { $match: { date: { $gte: monthStart, $lt: monthEnd } } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const monthlyRevenue = (payments[0] && payments[0].total) || 0;

    // basic attendance count for last 30 days
    const last30 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const totalAttendance = await Attendance.countDocuments({
      date: { $gte: last30 },
    });

    res.json({
      studentsCount,
      monthlyRevenue,
      totalAttendance,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
