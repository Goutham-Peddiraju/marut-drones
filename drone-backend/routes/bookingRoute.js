const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking"); // make sure this path is correct

// GET all bookings for a specific user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const bookings = await Booking.find({ userId });
    res.json({ bookings });
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ message: "Error fetching bookings" });
  }
});


router.post("/", async (req, res) => {
  try {
    const { droneName, startTime, totalDuration, pilotName, location, userId } = req.body;
    const booking = new Booking({ droneName, startTime, totalDuration, pilotName, location, userId });
    await booking.save();
    res.status(201).json({ message: "Booking successful", booking });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
