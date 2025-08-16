// server.js
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require("cors");

dotenv.config();
app.use(express.json());

// Import routes
const bookingRoutes = require("./routes/bookingRoute");
const userRoutes = require('./routes/userRoutes');
const droneRoutes = require('./routes/droneRoutes');

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to database'))
  .catch(() => console.log('❌ Database connection failed'));

// CORS setup (allow your frontend only)
app.use(cors({
  origin: "https://goutham-droneproject.vercel.app", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Test API
app.get("/api/test", async (req, res) => {
  return res.json({
    success: true,
    message: "From Backend"
  });
});

// Routes
app.use('/auth', userRoutes);
app.use('/drone', droneRoutes);
app.use('/booking', bookingRoutes);

// ✅ For local development
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
}

// ✅ For Vercel deployment (export app)
module.exports = app;
