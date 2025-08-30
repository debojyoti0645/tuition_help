// seed.js
require("dotenv").config();
const connectDB = require("./config/db");
const Student = require("./models/Student");
const Payment = require("./models/Payment");
const Attendance = require("./models/Attendance");

const seed = async () => {
  await connectDB();
  await Student.deleteMany();
  await Payment.deleteMany();
  await Attendance.deleteMany();

  const students = await Student.insertMany([
    {
      name: "Aarav Gupta",
      phone: "90000",
      weeklySchedule: [{ day: "Mon", time: "17:00" }],
    },
    {
      name: "Ananya Sen",
      phone: "90001",
      weeklySchedule: [{ day: "Tue", time: "17:30" }],
    },
    // add more...
  ]);

  // create some payments
  await Payment.insertMany([
    { studentId: students[0]._id, amount: 800, date: new Date() },
    { studentId: students[1]._id, amount: 800, date: new Date() },
  ]);

  // attendance
  await Attendance.insertMany([
    { studentId: students[0]._id, date: new Date(), type: "regular" },
  ]);

  console.log("Seed done");
  process.exit();
};

seed();
