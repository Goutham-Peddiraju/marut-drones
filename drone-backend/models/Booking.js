const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  droneName: { type: String, required: true },
  startTime: { type: String, required: true },
  totalDuration: { type: Number, required: true },
  pilotName: { type: String, required: true },
  location: { type: String, required: true },
  bookingDate: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Booking", bookingSchema);
