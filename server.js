// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const studentsRoutes = require('./routes/students.js');
const paymentsRoutes = require('./routes/payments.js'); 
const attendanceRoutes = require('./routes/attendance.js');
const dashboardRoutes = require('./routes/dashboard.js');
const timetableRoutes = require('./routes/timetable.js');

connectDB();
const app = express();

app.use(cors());            // allow cross-origin requests
app.use(express.json());    // body parser for JSON

app.use('/api/students', studentsRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/timetable', timetableRoutes);

app.get('/', (req, res) => res.send('Tuition Tracker API running'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
