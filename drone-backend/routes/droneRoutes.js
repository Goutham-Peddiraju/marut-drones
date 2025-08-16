// routes/drone.js
const express = require("express");
const router = express.Router();
const DroneBooking = require("../models/Booking"); // example model

router.post("/booking", async (req, res) => {
  try {
    const { droneName, startTime, totalDuration, pilotName, location } = req.body;
    console.log("Booking request received:", req.body);

    // Validate required fields
    if (!droneName || !startTime || !totalDuration || !pilotName || !location) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Save booking to DB
    const booking = new DroneBooking({ droneName, startTime, totalDuration, pilotName, location });
    await booking.save();

    

    res.status(201).json({ message: "Booking successful", booking });
  } catch (error) {
    console.error("Booking error:", error); // <--- log the error
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
